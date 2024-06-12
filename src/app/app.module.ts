import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from 'src/routes/users/users.module';
import { AuthModule } from 'src/routes/auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
})
export class AppModule {}
