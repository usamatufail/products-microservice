import { Model } from 'mongoose';
import { LogDocument } from './schema';
export declare class LogsService {
    private readonly model;
    constructor(model: Model<LogDocument>);
    getAll(): Promise<LogDocument[]>;
}
