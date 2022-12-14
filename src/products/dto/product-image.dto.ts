import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ProductImageDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'public_id from cloudinary' })
  @IsString()
  @IsNotEmpty()
  puclic_id: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/*' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
