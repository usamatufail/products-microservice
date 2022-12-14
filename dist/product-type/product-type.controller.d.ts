import { ProductTypeService } from './product-type.service';
import { ProductTypeDto } from './dto';
import { ProductType } from './schema';
export declare class ProductTypeController {
    private service;
    constructor(service: ProductTypeService);
    create(dto: ProductTypeDto): Promise<ProductType>;
    getAll(): Promise<ProductType[]>;
    getById(id: string): Promise<ProductType>;
    updateById(id: string, dto: ProductTypeDto): Promise<ProductType>;
    deleteById(id: string): Promise<void>;
}
