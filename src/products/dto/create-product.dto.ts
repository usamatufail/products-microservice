import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';
import { ObjectIdValidator } from '../../common';

export class CreateProductDto {
  @ApiProperty({ type: [ProductVariantDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ProductVariantDto)
  @ValidateNested({ each: true })
  mainVariant: ProductVariantDto;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(ObjectIdValidator)
  productType: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(ObjectIdValidator, { each: true })
  categories: string[];
}
