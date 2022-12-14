import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductImageDocument = ProductImage & Document;
@Schema()
export class ProductImage {
  @Prop({ required: true })
  public_id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  label: string;
}
export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
