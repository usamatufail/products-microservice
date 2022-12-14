import { ProductVariant } from '../schema/product-variant.schema';
import { ProductImage } from '../schema/product-image.schema';
export declare class ProductDto {
    variants: ProductVariant;
    name: string;
    tags: string[];
    mainVariant: ProductVariant;
    productType: string;
    categories: string[];
    images: ProductImage[];
}
