import { AuthGuard } from '@nestjs/passport';

export class AtStrategyGuard extends AuthGuard('at-strategy') {
  constructor() {
    super();
  }
}

export class RtStrategyGuard extends AuthGuard('rt-strategy') {
  constructor() {
    super();
  }
}
