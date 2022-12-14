import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
export declare class LoggingMiddleware implements NestMiddleware {
    private model;
    constructor(model: Model<any>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private insertMongo;
}
