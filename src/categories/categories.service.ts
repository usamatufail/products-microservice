import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dto';
import { Category, CategoryDocument } from './schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<CategoryDocument>,
  ) {}

  async create(dto: CategoryDto): Promise<Category> {
    return await this.model.create(dto);
  }

  async getAll(): Promise<Category[]> {
    return await this.model.find().exec();
  }

  async getById(id: string): Promise<Category> {
    const data = await this.model.findById(id);
    if (!data) {
      throw new NotFoundException('Not found');
    }
    return data;
  }

  async updateById(id: string, dto: CategoryDto): Promise<Category> {
    const updated = await this.model.findOneAndUpdate({ _id: id }, dto, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  async deleteById(id: string): Promise<void> {
    const find = await this.model.findById(id);
    if (!find) {
      throw new NotFoundException('Category not found');
    }
    await this.model.findByIdAndDelete(id).exec();
  }
}
