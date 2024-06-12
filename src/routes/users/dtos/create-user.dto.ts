import { OmitType } from '@nestjs/mapped-types';
import { UserModel } from 'src/models/user.model';

export class CreateUserDto extends OmitType(UserModel, [
  'id',
  'projects',
  'refreshToken',
  'createdAt',
  'updatedAt',
] as const) {}
