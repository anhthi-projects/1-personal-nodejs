import { IsDate, IsNotEmpty, IsString } from 'class-validator';

import { UserModel } from './user.model';

export class ProjectModel {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  techStacks: string[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  owner: UserModel;

  @IsDate()
  createdAt?: string;

  @IsDate()
  updatedAt?: string;
}
