import React, { useState, useEffect } from 'react';
import menu from '../../data/menu.json';

export const useNavStore = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function getMenu() {
      const url = `${process.env.REACT_APP_API_STORE_PREFIX_URL}GetNavigationMenu`;
      const response = await fetch(url);
      const data = await response.json();
      setState(data);
    }
    getMenu();
  }, []);
  // const updatestate = (state) => {
  //   setState(state);
  // };
  const getMenu = () => {
    return [...state];
  };
  const selectMenuItem = (index, showSubMenus = true) => {
    let menuItems = getMenu();
    console.log(menuItems);
    menuItems.forEach((menuItem, idx) => {
      if (idx === index) {
        menuItem.IsActive = true;
        if (menuItem.SubMenus && showSubMenus)
          menuItem.ShowSubMenus = !menuItem.ShowSubMenus;
      } else {
        menuItems[idx].IsActive = false;
        menuItem.ShowSubMenus = false;
      }
    });
    //menuItems[index].isActive = true;
    setState(menuItems);
  };

  const toggleSubMenu = (parentIndex) => {
    const menuItems = getMenu();
    const menuItem = menuItems[parentIndex];
    menuItem.ShowSubMenus = !menuItem.ShowSubMenus;
    setState(menuItems);
  };

  return { getMenu, selectMenuItem, toggleSubMenu };
};
