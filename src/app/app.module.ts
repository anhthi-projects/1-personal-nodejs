import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
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
  ],
})
export class AppModule {}
