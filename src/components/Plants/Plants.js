import React from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '../Products/Products';
import { useProductsState } from '../Providers/ProductsState';

export const Plants = () => {
  const { getProducts } = useProductsState();
  const products = getProducts();
  let productsByCat = products;
  const { name } = useParams();
  if (name) {
    productsByCat = products.filter((p) => p.Type.toLowerCase() === name);
    if (productsByCat.length == 0) productsByCat = products;
  }
  return (
    <Products heading='Check out all of our plants' products={productsByCat} />
  );
};
