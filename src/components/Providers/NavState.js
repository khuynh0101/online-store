import React, { useContext, useState } from 'react';
import menu from '../../data/menu.json';

const NavStateContext = React.createContext();
export const NavStateProvider = ({ children }) => {
  const [navState, setNavState] = useState(menu);

  const value = {
    ...navState,
    setSelectedMenuItem(targetMenuItemName, openSubMenu) {
      console.log(targetMenuItemName, openSubMenu);
    },
  };

  return (
    <NavStateContext.Provider
      value={[navState, setNavState]}
      children={children}
    />
  );
};

export const useNavState = () => {
  return useContext(NavStateContext);
};
