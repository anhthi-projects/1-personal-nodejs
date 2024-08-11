import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ProjectModel } from './project.model';
import { SocialNetworkModel } from './social-networks';

export class UserModel {
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsString()
  jobPosition?: string;

  @ApiProperty()
  @IsNumber()
  yearOfExp?: number;

  @ApiProperty()
  @IsString()
  briefIntro?: string;

  @ApiProperty()
  @IsString()
  aboutMe?: string;

  @ApiProperty()
  @IsUrl()
  avatarUrl?: string;

  @ApiProperty()
  @IsUrl()
  cvUrl?: string;

  @ApiProperty()
  @IsString({
    each: true,
  })
  tags?: string[];

  @ApiProperty()
  @IsArray()
  projects?: ProjectModel[];

  @ApiProperty()
  @IsArray()
  socialNetworks?: SocialNetworkModel[];

  @IsString()
  storedRefreshToken?: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
