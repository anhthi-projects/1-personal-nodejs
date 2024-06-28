import { HttpStatus } from '@nestjs/common';

export interface ExceptionMessage {
  fields: [string];
  payload: any;
  details: Record<string, any>;
}

export interface AppException {
  path: string;
  message: string | ExceptionMessage;
  statusCode?: HttpStatus;
  statusTitle?: string;
}
