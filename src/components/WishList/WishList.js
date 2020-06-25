import React from 'react';
import globalStyles from '../../app.module.css';
import { Products } from '../Products/Products';
import { useWishListStore } from '../hooks/useWishListStore';
import { useProductsState } from '../Providers/ProductsState';

export const WishList = () => {
  const { getWishList } = useWishListStore();
  const { getProducts } = useProductsState();

  let wishListProducts = [];
  getWishList().map((wishListItem) => {
    const product = getProducts().filter((p) => p.id === wishListItem);
    if (product && product.length > 0) wishListProducts.push(product[0]);
  });

  return (
    <section className={globalStyles.container}>
      <Products
        heading='Here are the items you like to buy'
        products={wishListProducts}
      />
    </section>
  );
};
