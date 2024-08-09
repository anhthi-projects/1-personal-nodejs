import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SocialNetworkModel } from 'src/models/social-networks';
import { UserModel } from 'src/models/user.model';

import { CreateSocialNetworkDto } from './social-networks.dto';
import { SocialNetworksService } from './social-networks.service';

@ApiTags('social-networks')
@Controller('social-networks')
export class SocialNetworksController {
  constructor(private socialNetworksService: SocialNetworksService) {}

  /**
   * createSocialNetwork
   */

  @ApiOperation({
    summary: 'Create a new social network',
  })
  @ApiCreatedResponse({
    type: SocialNetworkModel,
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createSocialNetworks(@Body() payload: CreateSocialNetworkDto) {
    return this.socialNetworksService.createSocialNetwork(payload);
  }

  /**
   * deleteSocialNetwork
   */

  @ApiOperation({
    summary: 'Delete a social network',
  })
  @ApiCreatedResponse({
    type: UserModel,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteSocialNetwork(@Param('id') cnId: string) {
    this.socialNetworksService.deleteSocialNetwork(cnId);
  }
}
