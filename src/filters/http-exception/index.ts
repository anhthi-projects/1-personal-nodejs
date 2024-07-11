import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from 'src/types/exception';

interface NormalizeAppExceptionParams {
  url: string;
  statusCode: number;
  exceptionResponse: string | object;
}

const normalizeAppException = ({
  url,
  statusCode,
  exceptionResponse,
}: NormalizeAppExceptionParams): AppException => {
  /**
   * System Exception
   */

  if (typeof exceptionResponse === 'string') {
    return {
      url,
      message: [
        {
          details: {
            code: statusCode.toString(),
            description: exceptionResponse,
          },
        },
      ],
      statusCode,
    };
  }

  /**
   * Validation Exception
   */

  if (typeof exceptionResponse === 'object') {
    const { message, error } = exceptionResponse as any;
    return {
      url,
      message,
      statusCode,
      statusTitle: error,
    };
  }
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const appException: AppException = normalizeAppException({
      url: request.url,
      statusCode: status,
      exceptionResponse,
    });

    response.status(status).json(appException);
  }
}
