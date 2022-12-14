import mongoose, { Document } from 'mongoose';
export type LogDocument = Log & Document;
export declare class Log {
    endpoint: string;
    extra_options: any;
    requestTime: Date;
    user: string;
}
export declare const LogSchema: mongoose.Schema<Log, mongoose.Model<Log, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Log>;
