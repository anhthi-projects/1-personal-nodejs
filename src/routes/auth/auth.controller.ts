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

import { SignInDto } from './auth.dto';
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
  @Post('signup')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(RestrictUserInterceptor)
  signUp(@Body() userPayload: CreateUserDto) {
    return this.authService.signUp(userPayload);
  }

  /**
   * Sign In
   */

  @ApiOperation({
    summary: 'Sign in to get accessToken and refreshToken',
  })
  @ApiOkResponse({
    type: TokensResponse,
  })
  @Post('signin')
  @IsPublic()
  @UseInterceptors(RestrictUserInterceptor)
  @HttpCode(HttpStatus.OK)
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  /**
   * Sign Out
   */

  @ApiOperation({
    summary: 'Sign out',
  })
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  signOut(@GetHeaderUser('userId') userId: string) {
    return this.authService.signOut(userId);
  }

  /**
   * Refresh token
   */

  @ApiOperation({
    summary: 'Get a new accessToken',
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
