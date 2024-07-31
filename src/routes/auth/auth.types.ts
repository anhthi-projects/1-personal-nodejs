export class JwtPayload {
  id: string;
  email: string;
}

export class TokensResponse {
  access_token: string;
  refresh_token: string;
}
