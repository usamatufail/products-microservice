import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Category } from '../../categories/schema';
import { ProductType } from '../../product-type/schema';
import { ProductImage, ProductImageSchema } from './product-image.schema';
import { ProductVariant, ProductVariantSchema } from './product-variant.schema';

// Product Schema & Document
export type ProductsDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, isUnique: true })
  name: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ type: ProductVariantSchema, required: true })
  @Type(() => ProductVariant)
  mainVariant: ProductVariant;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductType.name,
    required: true,
  })
  productType: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category.name,
      },
    ],
    required: true,
  })
  @Type(() => Category)
  categories: Category[];

  @Prop([{ type: ProductImageSchema }])
  @Type(() => ProductImage)
  images: ProductImage[];

  @Prop({ type: [ProductVariantSchema] })
  @Type(() => ProductVariant)
  variants: ProductVariant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ '$**': 'text' });
