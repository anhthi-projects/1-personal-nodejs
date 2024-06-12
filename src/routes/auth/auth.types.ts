export type JwtPayload = {
  id: string;
  email: string;
};

export type TokensResponse = {
  access_token: string;
  refresh_token: string;
};
