import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { LogDocument } from '../logs/schema';
export declare class LoggingInterceptor implements NestInterceptor {
    private model;
    constructor(model: Model<LogDocument>);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private insertMongo;
}
