import { Module, Scope } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../common';
import { Log, LogSchema } from '../logs/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ImageUploadModule,
  ],
  providers: [
    ProductsService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: LoggingInterceptor,
    // },
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
