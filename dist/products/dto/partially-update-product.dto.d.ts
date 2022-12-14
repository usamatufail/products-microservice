import { ProductVariantDto } from './product-variant.dto';
export declare class PartiallyUpdateProductDto {
    name: string;
    tags: string[];
    mainVariant: ProductVariantDto;
    productType: string;
    categories: string[];
}
