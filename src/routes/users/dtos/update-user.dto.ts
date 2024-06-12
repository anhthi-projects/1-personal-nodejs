import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserModel } from 'src/models/user.model';

export class UpdateUserDto extends PartialType(
  OmitType(UserModel, [
    'id',
    'projects',
    'refreshToken',
    'createdAt',
    'updatedAt',
  ] as const),
) {}
