import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';
export declare class MongooseException implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): Response<any, Record<string, any>>;
}
