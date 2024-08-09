import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

import { UserModel } from './user.model';

export class ProjectModel {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  techStacks: string[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  user?: UserModel;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
