import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetHeaderUser } from 'src/decorators/get-header-user';
import { AccessTokenGuard } from 'src/guards/at.guard';
import { RefreshTokenGuard } from 'src/guards/rt.guard';

import { CreateUserDto } from '../users/dtos/create-user.dto';

import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userPayload: CreateUserDto) {
    return this.authService.signUp(userPayload);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  logout(@GetHeaderUser('userId') userId: string) {
    return this.authService.logout(userId);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  refreshToken(
    @GetHeaderUser() user: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshToken(user.userId, user.refreshToken);
  }
}
