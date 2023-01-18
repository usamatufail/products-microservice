import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from 'src/common';

export class CategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotBlank()
  name?: string;
}
