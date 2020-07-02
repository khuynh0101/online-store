import React from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '../Products/Products';
import { useProductsState } from '../Providers/ProductsState';

export const Search = () => {
  const { getProducts } = useProductsState();
  const { term } = useParams();
  let products = null;
  if (term) {
    products = getProducts().filter((p) =>
      p.Keywords.toLowerCase().includes(term.toLowerCase())
    );
  }
  const heading =
    products.length > 0
      ? `Here is your search results for \'${term}\'`
      : `Sorry, there's no plants matching your search for \'${term}\'`;
  return <Products heading={heading} products={products} />;
};
