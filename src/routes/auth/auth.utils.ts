import { JwtService } from '@nestjs/jwt';
import appConfigFn from 'src/app/app.config';

import { TokensResponse } from './auth.types';

const appConfig = appConfigFn();

type GetTokensParams = {
  jwtService: JwtService;
  jwtPayload: {
    userId: string;
    email: string;
  };
};

export const getTokens = async ({
  jwtService,
  jwtPayload,
}: GetTokensParams): Promise<TokensResponse> => {
  const [at, rt] = await Promise.all([
    jwtService.signAsync(jwtPayload, {
      secret: appConfig.jwt.accessTokenSecret,
      expiresIn: 60 * 60 * 24, // 1 day
    }),
    jwtService.signAsync(jwtPayload, {
      secret: appConfig.jwt.refreshTokenSecret,
      expiresIn: 60 * 60 * 24 * 7, // 1 week
    }),
  ]);

  return { accessToken: at, refreshToken: rt };
};
