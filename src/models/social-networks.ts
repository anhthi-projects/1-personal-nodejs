import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { UserModel } from './user.model';

export class SocialNetworkModel {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  user?: UserModel;
}
