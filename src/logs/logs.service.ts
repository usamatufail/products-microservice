import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name)
    private readonly model: Model<LogDocument>,
  ) {}

  async getAll(): Promise<LogDocument[]> {
    return await this.model.find().exec();
  }
}
