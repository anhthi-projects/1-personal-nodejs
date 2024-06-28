import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserSensitiveInterceptor } from 'src/interceptors/user-sensitive.interceptor';

import { CreateUserDto } from './users.dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  @UseInterceptors(UserSensitiveInterceptor)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseInterceptors(UserSensitiveInterceptor)
  updateUser(@Param('id') id: string, @Body() payload: CreateUserDto) {
    return this.userService.updateUser(id, payload);
  }
}
