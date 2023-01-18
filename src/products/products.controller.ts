import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Role, Roles, AuthorizationGuard, RolesGuard, BypassAuth, ParseObjectIdPipe, LoggingInterceptor } from '../common';
import {
  CreateProductDto,
  FullyUpdateProductDto,
  PartiallyUpdateProductDto,
  PartiallyUpdateProductVariantDto,
  ProductVariantDto,
} from './dto';
import { ProductsService } from './products.service';
import { Product } from './schema';
import { fileOptions, singleFileOptions } from './utils';
import { ProductVariant } from './schema/product-variant.schema';

@ApiTags('Products')
@Roles(Role.ADMIN)
@UseGuards(AuthorizationGuard, RolesGuard)
@Controller('products')
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor)
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new product' })
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Fully updates a product per id' })
  fullyUpdateById(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: FullyUpdateProductDto): Promise<Product> {
    return this.service.fullyUpdateById(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially updates a product per id' })
  partiallyUpdateById(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: PartiallyUpdateProductDto): Promise<Product> {
    return this.service.partiallyUpdateById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletes a product per id' })
  deleteById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.service.deleteById(id);
  }

  @Patch(':id/variants/:variantId')
  @ApiOperation({ summary: 'Partially update a variant from a product per id' })
  partiallyUpdateVariantById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('variantId', ParseObjectIdPipe) variantId: string,
    @Body() dto: PartiallyUpdateProductVariantDto,
  ): Promise<ProductVariant[]> {
    return this.service.partiallyUpdateVariantById(id, variantId, dto);
  }

  @Delete(':id/variants/:variantId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Deletes a variant of a product per id' })
  deleteVariantById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('variantId', ParseObjectIdPipe) variantId: string,
  ): Promise<ProductVariant[]> {
    return this.service.deleteVariantById(id, variantId);
  }

  @Put(':id/variants')
  @ApiOperation({ summary: 'Batch update/replace variants for a product id' })
  @ApiBody({ type: [ProductVariantDto] })
  replaceVariantsById(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: ProductVariantDto[]): Promise<ProductVariant[]> {
    return this.service.replaceVariantsById(id, dto);
  }

  @Post(':id/images')
  @ApiOperation({ summary: 'Upload images in newly created product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileOptions)
  @UseInterceptors(AnyFilesInterceptor())
  async uploadImage(@Req() req: Request, @Param('id') id: string) {
    return this.service.uploadImages(req.files as Express.Multer.File[], id);
  }

  @Put(':id/images')
  @ApiOperation({ summary: 'Batch Updates images in a Product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileOptions)
  @UseInterceptors(AnyFilesInterceptor())
  async updateImages(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: string) {
    return this.service.updateImages(req.files as Express.Multer.File[], id);
  }

  @Put(':id/images/:imageId')
  @ApiOperation({ summary: 'Update image in a Product by Id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(singleFileOptions)
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('imageId', ParseObjectIdPipe) imageId: string,
  ) {
    return this.service.updateImage(file, id, imageId);
  }

  @Delete(':id/image/:imageId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Delete an image of a product per id' })
  deleteImageById(@Param('id', ParseObjectIdPipe) id: string, @Param('imageId', ParseObjectIdPipe) imageId: string) {
    return this.service.deleteImageById(id, imageId);
  }

  // @Get()
  // // @BypassAuth()
  // @ApiOperation({ summary: 'Gets All Products' })
  // @ApiQuery({
  //   name: 'page',
  //   required: false,
  //   type: Number,
  //   example: 1,
  // })
  // @ApiQuery({
  //   name: 'search',
  //   required: false,
  //   type: String,
  //   description:
  //     'Search products by categories, tags, name, variants, and createdAt etc. <br /> In order to search for date use date in one of these formats: `MM/DD/YYYY`, or `MM-DD-YYYY`',
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: false,
  //   type: Number,
  //   example: 10,
  // })
  // getAll(
  //   @Query('search') search: string = '',
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  // ): Promise<{ products: Product[]; totalPages: number; currentPage: number }> {
  //   return this.service.getAll(search, page, limit);
  // }

  // @Get(':id')
  // // @BypassAuth()
  // @ApiOperation({ summary: 'Gets product by Id' })
  // getById(@Param('id', ParseObjectIdPipe) id: string): Promise<Product> {
  //   return this.service.getById(id);
  // }
}
