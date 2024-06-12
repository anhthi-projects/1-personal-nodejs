import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return targetUser;
  }

  createUser(payload: CreateUserDto) {
    return this.prisma.user.create({
      data: payload,
    });
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      data: payload,
      where: {
        id,
      },
    });
  }
}
