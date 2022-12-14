import moment, * as moments from 'moment';

export const filterProducts = (search: string, products: any): any => {
  const lowerSearch = search?.toLowerCase();
  const filtered = products?.filter((product: any) => {
    let categoryContains: boolean = false;
    let variantsInlcluded: boolean = false;
    let tagsIncluded: boolean = false;
    product?.categories?.forEach((category: any) => {
      if (category?.name?.toLowerCase()?.includes(lowerSearch)) {
        categoryContains = true;
      }
    });
    product?.variants?.forEach((variant: any) => {
      if (variant?.name?.toLowerCase()?.includes(lowerSearch)) {
        variantsInlcluded = true;
      }
    });
    product?.tags?.forEach((tag: any) => {
      if (tag?.toLowerCase()?.includes(lowerSearch)) {
        tagsIncluded = true;
      }
    });
    const createDate = moments(product?.createdAt).format('YYYY-MM-DD');
    const searchDate = moments(search).format('YYYY-MM-DD');
    return (
      categoryContains ||
      variantsInlcluded ||
      tagsIncluded ||
      createDate === searchDate ||
      product?.name?.toLowerCase()?.includes(lowerSearch) ||
      product?.productType?.name?.toLowerCase()?.includes(search) ||
      product?.mainVariant?.name?.toLowerCase()?.includes(lowerSearch)
    );
  });

  return filtered;
};
