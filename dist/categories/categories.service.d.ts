import { Model } from 'mongoose';
import { CategoryDto } from './dto';
import { Category, CategoryDocument } from './schema';
export declare class CategoriesService {
    private readonly model;
    constructor(model: Model<CategoryDocument>);
    create(dto: CategoryDto): Promise<Category>;
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category>;
    updateById(id: string, dto: CategoryDto): Promise<Category>;
    deleteById(id: string): Promise<void>;
}
