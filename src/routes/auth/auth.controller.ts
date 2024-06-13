import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { GetHeaderUser } from 'src/decorators/get-header-user';
import { AuthGuard } from '@nestjs/passport';
import { AtStrategyGuard, RtStrategyGuard } from './auth.guards';

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
  @UseGuards(AtStrategyGuard)
  logout(@GetHeaderUser('userId') userId: string) {
    return this.authService.logout(userId);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RtStrategyGuard)
  refreshToken(
    @GetHeaderUser() user: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshToken(user.userId, user.refreshToken);
  }
}
