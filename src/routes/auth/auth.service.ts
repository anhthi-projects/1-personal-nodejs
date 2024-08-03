import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import appConfigFn from 'src/app/app.config';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { UserModel } from 'src/models/user.model';
import { getRandomString, hashData } from 'src/utils/helpers';

import { CreateUserDto } from '../users/users.dtos';

import { SignInDto } from './auth.dto';
import { TokensResponse } from './auth.types';
import { getTokens } from './auth.utils';

const appConfig = appConfigFn();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign up for a new user
   */

  async signUp(payload: CreateUserDto): Promise<UserModel> {
    const username = payload.name.split(' ').join('_').toLowerCase();
    const hashedPassword = await hashData(payload.password);
    const createdUser = await this.prisma.user.create({
      data: {
        ...payload,
        username: `${username}_${getRandomString()}`,
        password: hashedPassword,
      },
    });

    const tokens = await getTokens({
      jwtService: this.jwtService,
      jwtPayload: {
        userId: createdUser.id,
        email: createdUser.email,
      },
    });

    await this.updateRtToUser(createdUser.id, tokens.refreshToken);
    return createdUser;
  }

  /**
   * Sign in
   */

  async signIn(payload: SignInDto): Promise<TokensResponse & UserModel> {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('User cannot be found');
    }

    const isPasswordMatched = await bcrypt.compare(
      payload.password,
      targetUser.password,
    );

    if (!isPasswordMatched) {
      throw new ForbiddenException('Password is incorrect');
    }

    const tokens = await getTokens({
      jwtService: this.jwtService,
      jwtPayload: {
        userId: targetUser.id,
        email: targetUser.email,
      },
    });

    await this.updateRtToUser(targetUser.id, tokens.refreshToken);
    return {
      ...tokens,
      ...targetUser,
    };
  }

  /**
   * Sign Out
   */

  signOut(userId: string) {
    this.prisma.user.update({
      data: {
        storedRefreshToken: null,
      },
      where: {
        id: userId,
        storedRefreshToken: {
          not: null,
        },
      },
    });
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokensResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Forbidden access');
    }

    const isRefreshTokenValid = await this.jwtService.verify(refreshToken, {
      secret: appConfig.jwt.refreshTokenSecret,
    });
    const isRtMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid || !isRtMatches) {
      throw new ForbiddenException('Refresh token is invalid or not matched');
    }

    const newTokens = await getTokens({
      jwtService: this.jwtService,
      jwtPayload: {
        userId: user.id,
        email: user.email,
      },
    });
    await this.updateRtToUser(user.id, newTokens.refreshToken);
    return newTokens;
  }

  async updateRtToUser(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.prisma.user.update({
      data: {
        storedRefreshToken: hashedRefreshToken,
      },
      where: {
        id: userId,
      },
    });
  }
}
