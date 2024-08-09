import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  phone?: string;

  @IsString()
  @ApiProperty()
  jobPosition?: string;

  @IsNumber()
  @ApiProperty()
  yearOfExp?: number;

  @IsString()
  @ApiProperty()
  briefIntro?: string;

  @IsString()
  @ApiProperty()
  aboutMe?: string;

  @IsUrl()
  @ApiProperty()
  avatarUrl?: string;

  @IsUrl()
  @ApiProperty()
  cvUrl?: string;

  @IsString({
    each: true,
  })
  @ApiProperty()
  tags?: string[];

  @IsArray()
  projects?: ProjectModel[];

  @IsArray()
  socialNetworks?: SocialNetworkModel[];

  @IsString()
  storedRefreshToken?: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
