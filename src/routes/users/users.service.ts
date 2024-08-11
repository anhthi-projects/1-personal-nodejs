import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';
import { UserModel } from 'src/models/user.model';

import { ChangeUsernameDto, UpdateUserDto } from './users.dtos';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * getUserByUsername
   */

  async getUserByUsername(username: string): Promise<UserModel> {
    const targetUser = await this.prisma.user.findUnique({
      where: { username },
      include: {
        socialNetworks: true,
        projects: true,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return targetUser;
  }

  /**
   * updateUserById
   */

  async updateUserById(userId: string, payload: UpdateUserDto) {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      data: payload,
      where: {
        id: userId,
      },
    });
  }

  /**
   * changeUsername
   */

  async changeUsername(userId: string, payload: ChangeUsernameDto) {
    const isExisted = await this.prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (isExisted) {
      throw new ForbiddenException('The username is existed');
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: payload.username,
      },
    });
  }
}
