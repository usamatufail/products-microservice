import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { Log, LogSchema } from '../logs/schema';
import { ProductsResolver } from './products.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ImageUploadModule,
  ],
  providers: [ProductsService, ProductsResolver],
  controllers: [ProductsController],
})
export class ProductsModule {}
