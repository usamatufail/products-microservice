import mongoose, { Document } from 'mongoose';
import { Category } from '../../categories/schema';
import { ProductImage } from './product-image.schema';
import { ProductVariant } from './product-variant.schema';
export type ProductsDocument = Product & Document;
export declare class Product {
    name: string;
    tags: string[];
    mainVariant: ProductVariant;
    productType: string;
    categories: Category[];
    images: ProductImage[];
    variants: ProductVariant[];
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product>;
