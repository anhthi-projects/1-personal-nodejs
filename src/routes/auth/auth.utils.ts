import { JwtService } from '@nestjs/jwt';

type GetTokensParam = {
  jwtService: JwtService;
  userId: string;
  email: string;
};

export const getTokens = async ({
  jwtService,
  userId,
  email,
}: GetTokensParam) => {
  const [at, rt] = await Promise.all([
    jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        secret: 'at-secret',
        expiresIn: 60 * 15, // 15 mins
      },
    ),
    jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        secret: 'rt-secret',
        expiresIn: 60 * 60 * 24 * 7, // 1 week
      },
    ),
  ]);

  return { at, rt };
};
