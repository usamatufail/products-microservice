import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';
import { ObjectIdValidator } from '../../common';

export class FullyUpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @Validate(ObjectIdValidator, { each: true })
  categories: string[];
}
