import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeDto } from './dto';
import { ProductType } from './schema';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard, LoggingInterceptor, Role, Roles, RolesGuard } from '../common';

@ApiTags('Product Type')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(AuthorizationGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('product-type')
export class ProductTypeController {
  constructor(private service: ProductTypeService) {}

  @ApiResponse({ status: 201 })
  @Post()
  async create(@Body() dto: ProductTypeDto): Promise<ProductType> {
    return this.service.create(dto);
  }

  @ApiResponse({ status: 200 })
  @Get()
  async getAll(): Promise<ProductType[]> {
    return this.service.getAll();
  }

  @ApiResponse({ status: 200 })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProductType> {
    return this.service.getById(id);
  }

  @ApiResponse({ status: 201 })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() dto: ProductTypeDto): Promise<ProductType> {
    return this.service.updateById(id, dto);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.service.deleteById(id);
  }
}
