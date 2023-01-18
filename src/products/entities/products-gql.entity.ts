import { Field, Int, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ProductVariant {
  @Field(() => ID)
  id?: string;

  @Field()
  name?: string;

  @Field(() => Int)
  price?: number;
}

@ObjectType()
class ProductTypeClass {
  @Field(() => ID)
  id?: string;

  @Field()
  name?: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}

@ObjectType()
class Categories {
  @Field(() => ID)
  id?: string;

  @Field()
  name?: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}

@ObjectType()
class ProductImage {
  @Field(() => ID)
  id?: string;

  @Field()
  label: string;

  @Field()
  puclic_id: string;

  @Field()
  url: string;
}

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id?: string;

  @Field()
  name?: string;

  @Field(() => ProductVariant)
  mainVariant?: ProductVariant;

  @Field(() => [ProductVariant])
  variants?: ProductVariant[];

  @Field(() => [String])
  tags?: string[];

  @Field(() => ProductTypeClass)
  productType?: ProductTypeClass;

  @Field(() => [Categories])
  categories?: Categories[];

  @Field(() => [ProductImage])
  images?: ProductImage[];

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}

@ObjectType()
export class AllProductsType {
  @Field(() => [ProductType])
  products?: ProductType[];

  @Field(() => Int)
  totalPages?: number;

  @Field(() => Int)
  currentPage?: number;
}
