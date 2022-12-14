import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';
import { Category } from './schema';
export declare class ProductTypesController {
    private service;
    constructor(service: CategoriesService);
    createCategory(category: CategoryDto): Promise<Category>;
    getCategories(): Promise<Category[]>;
    getCategoryById(categoryId: string): Promise<Category>;
    updateCategoryById(categoryId: string, category: CategoryDto): Promise<Category>;
    deleteCategoryById(categoryId: string): Promise<void>;
}
