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
import { IsPublic } from 'src/metadata/public.metadata';
import { UserModel } from 'src/models/user.model';

import { ChangeUsernameDto, CreateUserDto } from './users.dtos';
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
  @Get(':username')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(RestrictUserInterceptor)
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
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
  @Put(':id/update')
  @UseInterceptors(RestrictUserInterceptor)
  updateUserById(@Param('id') userId: string, @Body() payload: CreateUserDto) {
    return this.userService.updateUserById(userId, payload);
  }

  /**
   * changeUsername
   */

  @ApiOperation({
    summary: 'Check existing and change username',
  })
  @ApiOkResponse({
    type: UserModel,
  })
  @Put(':id/change-username')
  changeUsername(
    @Param('id') userId: string,
    @Body() payload: ChangeUsernameDto,
  ) {
    return this.userService.changeUsername(userId, payload);
  }
}
