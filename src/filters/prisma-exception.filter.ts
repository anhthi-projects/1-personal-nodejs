import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { AppException } from './types';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const appException: AppException = {
          path: request.url,
          message: {
            fields: exception.meta.target as [string],
            payload: request.body,
            details: {
              [exception.code]: 'Unique constraint failed',
            },
          },
          statusCode: status,
          statusTitle: 'Prisma Client Error',
        };
        response.status(status).json(appException);
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
