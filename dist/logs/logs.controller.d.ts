import { LogsService } from './logs.service';
import { LogDocument } from './schema';
export declare class LogsController {
    private readonly logService;
    constructor(logService: LogsService);
    getAll(): Promise<LogDocument[]>;
}
