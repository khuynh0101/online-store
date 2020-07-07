import React, { useContext, useState, useEffect } from 'react';
import * as storage from '../../utils/localStorage';

const CartStateContext = React.createContext();
export const CartStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(storage.getCart() || []);
  }, []);

  const updateCart = (cartItems) => {
    setCartItems(cartItems);
    storage.updateCart(cartItems);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  //if product is in cart, remove it. If it isn't, add it
  const toggleToCart = (id, price) => {
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === id);
    if (index > -1) removeItem(id);
    else addItem(id, price);
  };

  const inCart = (id) => {
    return cartItems.findIndex((p) => p.id === id) > -1;
  };

  const addItem = (id, price) => {
    const items = [...cartItems];
    const item = {
      id: id,
      numItem: 1,
      price: price,
    };
    items.push(item);
    updateCart(items);
  };

  const removeItem = (id) => {
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === id);
    items.splice(index, 1);
    updateCart(items);
  };

  const removeAllItems = (id) => {
    updateCart([]);
  };

  const increaseCount = (id) => {
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === id);
    if (index > -1) {
      const item = items[index];
      item.numItem++;
      item.price = item.numItem * item.price;
    }
    updateCart(items);
  };

  const decreaseCount = (id) => {
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === id);
    if (index > -1) {
      const item = items[index];
      if (item.numItem > 1) {
        item.numItem--;
        item.price = item.numItem * item.price;
      }
    }
    updateCart(items);
  };

  const value = {
    cartItems,
    toggleToCart,
    removeItem,
    removeAllItems,
    inCart,
    increaseCount,
    decreaseCount,
    getTotalItems,
  };

  return <CartStateContext.Provider value={value} children={children} />;
};

export const useCartState = () => {
  return useContext(CartStateContext);
};
