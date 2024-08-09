import { OmitType } from '@nestjs/mapped-types';
import { SocialNetworkModel } from 'src/models/social-networks';

export class CreateSocialNetworkDto extends OmitType(SocialNetworkModel, [
  'id',
  'user',
]) {}
