import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetHeaderUser } from 'src/decorators/get-header-user';
import { AccessTokenGuard } from 'src/guards/at.guard';
import { RefreshTokenGuard } from 'src/guards/rt.guard';
import { RestrictUserInterceptor } from 'src/interceptors/restrict-user.interceptor';
import { IsPublic } from 'src/metadata/public.metadata';
import { UserModel } from 'src/models/user.model';

import { CreateUserDto } from '../users/users.dtos';

import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { TokensResponse } from './auth.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Sign up
   */

  @ApiOperation({
    summary: 'Sign up a new user',
  })
  @ApiCreatedResponse({
    type: UserModel,
  })
  @Post('sign-up')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(RestrictUserInterceptor)
  signUp(@Body() userPayload: CreateUserDto) {
    return this.authService.signUp(userPayload);
  }

  /**
   * Login
   */

  @ApiOperation({
    summary: 'Login to access Dashboard',
  })
  @ApiOkResponse({
    type: TokensResponse,
  })
  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  /**
   * Logout
   */

  @ApiOperation({
    summary: 'Logout',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  logout(@GetHeaderUser('userId') userId: string) {
    return this.authService.logout(userId);
  }

  /**
   * Refresh token
   */

  @ApiOperation({
    summary: 'Get a new access_token',
  })
  @ApiOkResponse({
    type: TokensResponse,
  })
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  refreshToken(
    @GetHeaderUser() user: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshToken(user.userId, user.refreshToken);
  }
}
