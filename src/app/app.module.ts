import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from 'src/routes/users/users.module';

@Module({
  imports: [UsersModule, PrismaModule],
})
export class AppModule {}
