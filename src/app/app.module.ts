import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception';
import { PrismaClientExceptionFilter } from 'src/filters/prisma-exception';
import { AccessTokenGuard } from 'src/guards/at.guard';
import { AuthModule } from 'src/routes/auth/auth.module';
import { UsersModule } from 'src/routes/users/users.module';

import appConfig from './app.config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
