import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';

const responseCreator = (
  response: Response,
  request: Request,
  error: string,
) => {
  return response.status(HttpStatus.BAD_REQUEST).json({
    error,
    timestamp: new Date().toISOString(),
    path: request.url,
  });
};

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let error: string;
    switch (exception.code) {
      case 11000:
        // duplicate exception
        // do whatever you want here, for instance send error to client
        error = `Duplicate value found ${JSON.stringify(exception?.keyValue)}`;
        return responseCreator(response, request, error);
      default:
        error = exception?.message;
        return responseCreator(response, request, error);
    }
  }
}
