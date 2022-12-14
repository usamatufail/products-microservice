import { Model } from 'mongoose';
import { CategoryDto } from './dto';
import { Category, CategoryDocument } from './schema';
export declare class CategoriesService {
    private readonly model;
    constructor(model: Model<CategoryDocument>);
    createCategory(category: CategoryDto): Promise<Category>;
    getCategories(): Promise<Category[]>;
    getCategoryById(categoryId: string): Promise<Category>;
    updateCategoryById(categoryId: string, updatedDocument: CategoryDto): Promise<Category>;
    deleteCategoryById(categoryId: string): Promise<void>;
}
