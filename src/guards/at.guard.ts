import { AuthGuard } from '@nestjs/passport';

export class AccessTokenGuard extends AuthGuard('at-strategy') {
  constructor() {
    super();
  }
}
