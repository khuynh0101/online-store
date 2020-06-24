import React, { useContext, useState } from 'react';
import products from '../../data/products.json';

const ProductsStateContext = React.createContext();
export const ProductsStateProvider = ({ children }) => {
  const [productsState, setProductsState] = useState(products);
  return (
    <ProductsStateContext.Provider
      value={[productsState, setProductsState]}
      children={children}
    />
  );
};

export const useProductsState = () => {
  return useContext(ProductsStateContext);
};
