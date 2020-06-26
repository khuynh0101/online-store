import React, { useEffect } from 'react';
import { useProductsState } from '../Providers/ProductsState';
import { useCartState } from '../Providers/CartState';

export const useGetTotalCost = () => {
  const { cartItems } = useCartState();
  const { getProductsById } = useProductsState();

  let totalCost = 0;
  cartItems.forEach((cartItem) => {
    const product = getProductsById(cartItem.id);
    if (product) totalCost += cartItem.numItem * product.price;
  });
  return totalCost;
};
