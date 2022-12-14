import { ProductVariantDto } from './product-variant.dto';
import { ProductImageDto } from './product-image.dto';
export declare class ProductWithImagesDto {
    variants: ProductVariantDto[];
    name: string;
    tags: string[];
    mainVariant: ProductVariantDto;
    productType: string;
    categories: string[];
    images: ProductImageDto[];
}
