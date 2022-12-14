import { ProductVariantDto } from './product-variant.dto';
export declare class CreateProductDto {
    variants: ProductVariantDto[];
    name: string;
    tags: string[];
    mainVariant: ProductVariantDto;
    productType: string;
    categories: string[];
}
