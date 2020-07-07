import React, { useContext, useState, useEffect } from 'react';

const ProductsStateContext = React.createContext();
export const ProductsStateProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const url = `${process.env.REACT_APP_API_STORE_PREFIX_URL}GetAllProducts`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    }
    getProducts();
  }, []);

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
    const index = items.findIndex((p) => p.ProductId === id);
    const itemObj = items.filter((p) => p.ProductId === id);
    let item = null;
    if (itemObj && itemObj.length > 0) {
      item = itemObj[0];
    }
    return { items, item, index };
  };
  const getProductsById = (id) => {
    const products = getProducts().filter((p) => p.ProductId === id);
    if (products && products.length > 0) {
      return products[0];
    }
    return null;
  };
  const value = {
    products,
    getProductsById,
    selectProductItem,
    deSelectProductItem,
  };

  return <ProductsStateContext.Provider value={value} children={children} />;
};

export const useProductsState = () => {
  return useContext(ProductsStateContext);
};
