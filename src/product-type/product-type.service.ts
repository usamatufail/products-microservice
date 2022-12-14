import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductTypeDto } from './dto';
import { ProductType, ProductTypeDocument } from './schema';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly model: Model<ProductTypeDocument>,
  ) {}

  async create(productType: ProductTypeDto): Promise<ProductType> {
    return await this.model.create(productType);
  }

  async getAll(): Promise<ProductType[]> {
    return await this.model.find().exec();
  }

  async getById(id: string): Promise<ProductType> {
    const data = await this.model.findById(id);
    if (!data) {
      throw new NotFoundException('Not found');
    }
    return data;
  }

  async updateById(
    id: string,
    updatedDocument: ProductTypeDto,
  ): Promise<ProductType> {
    // try {
    const updated = await this.model.findOneAndUpdate(
      { _id: id },
      updatedDocument,
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const find = await this.model.findById(id);
    if (!find) {
      throw new NotFoundException('Not found');
    }
    await this.model.findByIdAndDelete(id).exec();
  }
}
