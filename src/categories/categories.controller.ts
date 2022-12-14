import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';
import { Category } from './schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard, LoggingInterceptor, Role, Roles, RolesGuard } from '../common';

@ApiTags('Categories')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(AuthorizationGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post()
  async create(@Body() dto: CategoryDto): Promise<Category> {
    return this.service.create(dto);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Category> {
    return this.service.getById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() dto: CategoryDto): Promise<Category> {
    return this.service.updateById(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.service.deleteById(id);
  }
}
