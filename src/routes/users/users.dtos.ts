import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { UserModel } from 'src/models/user.model';

export class CreateUserDto extends PickType(UserModel, [
  'username',
  'password',
  'name',
  'email',
] as const) {}

export class UpdateUserDto extends PartialType(
  OmitType(UserModel, [
    'id',
    'projects',
    'socialNetworks',
    'refreshToken',
    'createdAt',
    'updatedAt',
  ] as const),
) {}
