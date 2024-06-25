import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

import { ProjectModel } from './project.model';
import { SocialNetworkModel } from './social-networks';

export class UserModel {
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  phone?: string;

  @IsString()
  jobPosition?: string;

  @IsNumber()
  yearOfExp?: number;

  @IsString()
  aboutMe?: string;

  @IsUrl()
  cvUrl?: string;

  @IsString({
    each: true,
  })
  tags?: string[];

  @IsArray()
  projects?: ProjectModel[];

  @IsArray()
  socialNetworks?: SocialNetworkModel[];

  @IsString()
  refreshToken?: string;

  @IsDate()
  createdAt?: string;

  @IsDate()
  updatedAt?: string;
}
