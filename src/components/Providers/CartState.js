import React, { useContext, useState } from 'react';

const CartStateContext = React.createContext();
export const CartStateProvider = ({ children }) => {
  const [cartState, setCartState] = useState([]);
  return (
    <CartStateContext.Provider
      value={[cartState, setCartState]}
      children={children}
    />
  );
};

export const useCartState = () => {
  return useContext(CartStateContext);
};
