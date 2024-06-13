import { JwtService } from '@nestjs/jwt';
import { TokensResponse } from './auth.types';

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
      secret: 'at-secret',
      expiresIn: 60 * 15, // 15 mins
    }),
    jwtService.signAsync(jwtPayload, {
      secret: 'rt-secret',
      expiresIn: 60 * 60 * 24 * 7, // 1 week
    }),
  ]);

  return { access_token: at, refresh_token: rt };
};
