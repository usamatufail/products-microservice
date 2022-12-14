import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';
import { Category } from './schema';
export declare class CategoriesController {
    private service;
    constructor(service: CategoriesService);
    create(dto: CategoryDto): Promise<Category>;
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category>;
    updateById(id: string, dto: CategoryDto): Promise<Category>;
    deleteById(id: string): Promise<void>;
}
