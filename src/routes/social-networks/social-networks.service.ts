import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';

import { CreateSocialNetworkDto } from './social-networks.dto';

@Injectable()
export class SocialNetworksService {
  constructor(private prisma: PrismaService) {}

  /**
   * createSocialNetwork
   */

  async createSocialNetwork(payload: CreateSocialNetworkDto) {
    return this.prisma.socialNetWork.create({
      data: payload,
    });
  }
  /**
   * createSocialNetwork
   */

  async deleteSocialNetwork(cnId: string) {
    return this.prisma.socialNetWork.delete({
      where: {
        id: cnId,
      },
    });
  }
}
