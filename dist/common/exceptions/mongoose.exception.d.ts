import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
export declare class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoServerError, host: ArgumentsHost): void;
}
