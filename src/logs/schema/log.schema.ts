import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ isRequired: true })
  method: string;

  @Prop({ isRequired: true })
  url: string;

  @Prop({ isRequired: true })
  responseStatus: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  responseBody: any;

  @Prop()
  contentLength: string;

  @Prop({ isRequired: true })
  userAgent: string;

  @Prop({ isRequired: true })
  ip: string;

  @Prop({ isRequired: true })
  responseTime: string;

  @Prop({ isRequired: true })
  userId: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
