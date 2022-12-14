import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
