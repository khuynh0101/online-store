import React, { useState, useEffect } from 'react';
import menu from '../../data/menu.json';

export const useNavStore = () => {
  const [state, setState] = useState(menu || []);

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
        menuItem.isActive = true;
        if (menuItem.subMenus && showSubMenus)
          menuItem.showSubMenus = !menuItem.showSubMenus;
      } else {
        menuItems[idx].isActive = false;
        menuItem.showSubMenus = false;
      }
    });
    //menuItems[index].isActive = true;
    setState(menuItems);
  };

  const toggleSubMenu = (parentIndex) => {
    const menuItems = getMenu();
    const menuItem = menuItems[parentIndex];
    menuItem.showSubMenus = !menuItem.showSubMenus;
    setState(menuItems);
  };

  return { getMenu, selectMenuItem, toggleSubMenu };
};
