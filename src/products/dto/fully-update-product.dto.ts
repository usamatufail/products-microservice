import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';
import { IsNotBlank, ObjectIdValidator } from '../../common';

export class FullyUpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotBlank()
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
  @IsNotBlank()
  @Validate(ObjectIdValidator)
  productType: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(ObjectIdValidator, { each: true })
  categories: string[];
}
