import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userPayload: CreateUserDto) {
    return this.authService.signUp(userPayload);
  }

  @Post('sign-in')
  signIn() {}

  @Post('logout')
  logout() {}

  @Post('refresh-token')
  refreshToken() {}
}
