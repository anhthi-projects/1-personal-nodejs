import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.createUser(payload);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() payload: CreateUserDto) {
    return this.userService.updateUser(id, payload);
  }
}
