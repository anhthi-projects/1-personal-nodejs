import { HttpStatus } from '@nestjs/common';

export interface ExceptionMessageDetails {
  code: string;
  description: string;
}

export interface ExceptionMessage {
  details: ExceptionMessageDetails;
  fieldName?: string;
  payload?: any;
}

export interface AppException {
  url: string;
  message: ExceptionMessage[];
  statusCode?: HttpStatus;
  statusTitle?: string;
}
