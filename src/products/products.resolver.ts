import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductType, AllProductsType } from './entities';
import {
  Injectable,
  // UseGuards
} from '@nestjs/common';
import {
  // GQLRolesGuard, GQLAuthGuard, Role, Roles,
  ParseObjectIdPipe,
} from 'src/common';

// @Roles(Role.ADMIN)
// @UseGuards(GQLAuthGuard, GQLRolesGuard)
@Resolver((of) => ProductType)
@Injectable()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}
  @Query((returns) => AllProductsType)
  async products(
    @Args('limit', { nullable: true, type: () => Int }) limit: number = 10,
    @Args('page', { nullable: true, type: () => Int }) page: number = 1,
    @Args('search', { nullable: true }) search: string = '',
  ) {
    const products = await this.productsService.getAll(search, page, limit);
    return products;
  }

  @Query((returns) => ProductType)
  async product(@Args('id', ParseObjectIdPipe) id: string) {
    return this.productsService.getById(id);
  }
}
