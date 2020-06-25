import React, { useContext, useState } from 'react';
import productsJSON from '../../data/products.json';

const ProductsStateContext = React.createContext();
export const ProductsStateProvider = ({ children }) => {
  const [products, setProducts] = useState(productsJSON);

  const getProducts = () => {
    return [...products];
  };
  const selectProductItem = (id) => {
    let { items, item } = getItem(getProducts(), id);
    item.isSelected = true;
    setProducts(items);
  };
  const deSelectProductItem = (id) => {
    let { items, item } = getItem(getProducts(), id);
    item.isSelected = false;
    setProducts(items);
  };

  const getItem = (items, id) => {
    const index = items.findIndex((p) => p.id === id);
    const itemObj = items.filter((p) => p.id === id);
    let item = null;
    if (itemObj && itemObj.length > 0) {
      item = itemObj[0];
    }
    return { items, item, index };
  };
  const value = {
    getProducts,
    selectProductItem,
    deSelectProductItem,
  };

  return <ProductsStateContext.Provider value={value} children={children} />;
};

export const useProductsState = () => {
  return useContext(ProductsStateContext);
};
