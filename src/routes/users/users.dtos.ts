import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { UserModel } from 'src/models/user.model';

export class CreateUserDto extends PickType(UserModel, [
  'password',
  'name',
  'email',
] as const) {}

export class UpdateUserDto extends PartialType(
  OmitType(UserModel, [
    'id',
    'projects',
    'socialNetworks',
    'storedRefreshToken',
    'createdAt',
    'updatedAt',
  ] as const),
) {}

export class ChangeUsernameDto extends PickType(UserModel, ['username']) {}
