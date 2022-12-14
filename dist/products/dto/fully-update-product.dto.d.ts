import { ProductVariantDto } from './product-variant.dto';
export declare class FullyUpdateProductDto {
    name: string;
    tags: string[];
    mainVariant: ProductVariantDto;
    productType: string;
    categories: string[];
}
