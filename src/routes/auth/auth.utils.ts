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
      expiresIn: 60 * 15, // 15 mins
    }),
    jwtService.signAsync(jwtPayload, {
      secret: appConfig.jwt.refreshTokenSecret,
      expiresIn: 60 * 60 * 24 * 7, // 1 week
    }),
  ]);

  return { access_token: at, refresh_token: rt };
};
