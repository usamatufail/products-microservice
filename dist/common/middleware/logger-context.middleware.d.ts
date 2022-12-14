import { NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
export declare class LoggerContextMiddleware implements NestMiddleware {
    private readonly logger;
    constructor(logger: PinoLogger);
    use(req: Request, _res: Response, next: () => void): void;
}
