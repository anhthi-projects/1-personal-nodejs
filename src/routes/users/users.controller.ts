import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RestrictUserInterceptor } from 'src/interceptors/restrict-user.interceptor';
import { UserModel } from 'src/models/user.model';

import { CreateUserDto } from './users.dtos';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * getUserById
   */

  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiOkResponse({
    type: UserModel,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RestrictUserInterceptor)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  /**
   * updateUserById
   */

  @ApiOperation({
    summary: 'Update user by id',
  })
  @ApiOkResponse({
    type: UserModel,
  })
  @Put(':id')
  @UseInterceptors(RestrictUserInterceptor)
  updateUserById(@Param('id') id: string, @Body() payload: CreateUserDto) {
    return this.userService.updateUserById(id, payload);
  }
}
