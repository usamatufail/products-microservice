import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { ProductType, ProductTypeSchema } from './schema';
import { Log, LogSchema } from '../logs/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductType.name, schema: ProductTypeSchema }]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
