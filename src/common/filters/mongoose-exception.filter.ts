import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

const responseCreator = (
  response: Response,
  request: Request,
  error: string | any,
) => {
  return response.status(HttpStatus.BAD_REQUEST).json({
    error,
    timestamp: new Date().toISOString(),
    path: request.url,
  });
};

@Catch(Error)
export class MongooseException implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception.message);

    return responseCreator(response, request, exception?.message);
  }
}
