import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AppException } from './types';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const appException: AppException =
      typeof exceptionResponse === 'string'
        ? {
            path: request.url,
            message: exceptionResponse,
            statusCode: status,
          }
        : {
            path: request.url,

            message: (exceptionResponse as any).message,
            statusCode: status,
            statusTitle: (exceptionResponse as any).error,
          };

    response.status(status).json(appException);
  }
}
