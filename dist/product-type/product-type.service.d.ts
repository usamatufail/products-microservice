import { Model } from 'mongoose';
import { ProductTypeDto } from './dto';
import { ProductType, ProductTypeDocument } from './schema';
export declare class ProductTypeService {
    private readonly model;
    constructor(model: Model<ProductTypeDocument>);
    create(productType: ProductTypeDto): Promise<ProductType>;
    getAll(): Promise<ProductType[]>;
    getById(id: string): Promise<ProductType>;
    updateById(id: string, updatedDocument: ProductTypeDto): Promise<ProductType>;
    deleteById(id: string): Promise<void>;
}
