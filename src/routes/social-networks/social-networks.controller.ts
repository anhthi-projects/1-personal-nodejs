import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/metadata/public.metadata';
import { SocialNetworkModel } from 'src/models/social-networks';
import { UserModel } from 'src/models/user.model';

import { CreateSocialNetworkDto } from './social-networks.dto';
import { SocialNetworksService } from './social-networks.service';

@ApiTags('social-networks')
@Controller('social-networks')
export class SocialNetworksController {
  constructor(private socialNetworksService: SocialNetworksService) {}

  @ApiOperation({
    summary: 'Get social networks by userId',
  })
  @ApiCreatedResponse({
    type: SocialNetworkModel,
  })
  @IsPublic()
  @Get('users/:userId')
  @HttpCode(HttpStatus.OK)
  getSocialNetworksByUserId(@Param('userId') userId: string) {
    return this.socialNetworksService.getSocialNetworksByUserId(userId);
  }

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
    return this.socialNetworksService.deleteSocialNetwork(cnId);
  }
}
