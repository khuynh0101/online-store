import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductsLayout } from '../ProductsLayout/ProductsLayout';
import { useProductsState } from '../Providers/ProductsState';

export const Plants = () => {
  const [products, setProducts] = useProductsState();
  const filteredProducts = products.filter((p) => p.recommended);

  const { name } = useParams();
  return (
    <ProductsLayout heading='Check out all of our plants' products={products} />
  );
};
