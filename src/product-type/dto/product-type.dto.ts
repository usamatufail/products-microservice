import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from 'src/common';

export class ProductTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotBlank()
  name?: string;
}
