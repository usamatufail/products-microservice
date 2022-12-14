import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, Validate, ValidateNested } from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';
import { ObjectIdValidator } from '../../common';

export class PartiallyUpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty()
  @IsOptional()
  @Type(() => ProductVariantDto)
  @ValidateNested({ each: true })
  mainVariant: ProductVariantDto;

  @ApiProperty()
  @IsOptional()
  @Validate(ObjectIdValidator)
  productType: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @Validate(ObjectIdValidator, { each: true })
  categories: string[];
}
