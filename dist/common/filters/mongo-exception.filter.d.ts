import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
export declare class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoServerError, host: ArgumentsHost): Response<any, Record<string, any>>;
}
