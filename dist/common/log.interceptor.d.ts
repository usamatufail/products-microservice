import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { LogDocument } from '../logs/schema';
export declare class LoggingInterceptor implements NestInterceptor {
    private logModel;
    private readonly logger;
    constructor(logModel: Model<LogDocument>);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private insertMongo;
}
