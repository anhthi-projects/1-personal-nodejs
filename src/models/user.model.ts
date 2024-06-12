import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProjectModel } from './project.model';

export class UserModel {
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  yearOfExp: number;

  @IsString()
  @IsNotEmpty()
  aboutMe: string;

  projects: ProjectModel[];

  @IsString()
  refreshToken?: string;

  @IsDate()
  createdAt?: string;

  @IsDate()
  updatedAt?: string;
}
