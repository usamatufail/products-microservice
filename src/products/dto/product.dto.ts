import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';
import { ObjectIdValidator } from '../../common/validators/objectId.validator';
import { ProductImageDto } from './product-image.dto';
import { ProductVariant } from '../schema/product-variant.schema';
import { ProductImage } from '../schema/product-image.schema';

export class ProductDto {
  @ApiProperty({ type: [ProductVariantDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariant)
  variants: ProductVariant;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ type: ProductVariantDto })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductVariant)
  mainVariant: ProductVariant;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  productType: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(ObjectIdValidator, { each: true })
  categories: string[];

  @ApiProperty({ type: [ProductImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImage)
  images: ProductImage[];
}
