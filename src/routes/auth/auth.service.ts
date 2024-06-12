import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { hashData } from 'src/utils/helpers';
import { TokensResponse } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import { getTokens } from './auth.utils';

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
      userId: createdUser.id,
      email: createdUser.email,
    });
    await this.updateRtToUser(createdUser.id, tokens.rt);

    return {
      access_token: tokens.at,
      refresh_token: tokens.rt,
    };
  }

  signIn() {}

  logout() {}

  refreshToken() {}

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
