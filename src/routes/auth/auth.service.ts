import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { hashData } from 'src/utils/helpers';
import { TokensResponse } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import { getTokens } from './auth.utils';
import { SignInDto } from './dtos/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(userPayload: CreateUserDto): Promise<TokensResponse> {
    const hashedPassword = await hashData(userPayload.password);
    const createdUser = await this.prisma.user.create({
      data: {
        ...userPayload,
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
    await this.updateRtToUser(createdUser.id, tokens.refresh_token);

    return {
      ...createdUser,
      ...tokens,
    };
  }

  async signIn(payload: SignInDto): Promise<TokensResponse> {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('Email is not existed');
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
    await this.updateRtToUser(targetUser.id, tokens.refresh_token);

    return tokens;
  }

  logout(userId: string) {
    return this.prisma.user.update({
      data: {
        refreshToken: null,
      },
      where: {
        id: userId,
        refreshToken: {
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
      secret: 'rt-secret',
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
    await this.updateRtToUser(user.id, newTokens.refresh_token);
    return newTokens;
  }

  async updateRtToUser(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashData(refreshToken);
    await this.prisma.user.update({
      data: {
        refreshToken: hashedRefreshToken,
      },
      where: {
        id: userId,
      },
    });
  }
}
