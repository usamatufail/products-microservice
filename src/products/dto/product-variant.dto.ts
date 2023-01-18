import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { IsNotBlank } from '../../common';

export class ProductVariantDto {
  @ApiProperty()
  @IsString()
  @IsNotBlank()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class PartiallyUpdateProductVariantDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;
}
