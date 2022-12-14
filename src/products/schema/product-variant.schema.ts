import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductVariantDocument = ProductVariant & Document;

@Schema()
export class ProductVariant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}
export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);
