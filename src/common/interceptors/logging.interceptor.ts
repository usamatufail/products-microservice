import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LogDocument } from '../../logs/schema';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(@InjectModel('Log') private logModel: Model<LogDocument>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url, user } = request;

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');
        const responseTime = `${Date.now() - now}ms`;

        this.insertMongo(method, url, statusCode, contentLength, userAgent, ip, responseTime, res, user?.user_id);
      }),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }

  private async insertMongo(
    method: string,
    url: string,
    responseStatus: string,
    contentLength: string,
    userAgent: string,
    ip: string,
    responseTime: string,
    responseBody: any,
    userId: string,
  ) {
    const logInfo = {
      method,
      url,
      responseStatus,
      contentLength,
      userAgent,
      ip,
      responseTime,
      responseBody,
      userId,
    };
    const createdLog = new this.logModel(logInfo);
    return createdLog.save();
  }
}
