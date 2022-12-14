// @Prop({ required: true })
//

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ObjectIdValidator } from '../../common';

export class ProductVariantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
