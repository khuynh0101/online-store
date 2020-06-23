import React, { useState } from 'react';
import './App.css';
import menuObject from './data/menu.json';

import { Layout } from './components/Layout/Layout';
function App() {
  const [menu, setMenu] = useState(menuObject);

  const handleMenuItemClick = (event, index) => {
    event.preventDefault();

    let menuItems = [...menu];
    menuItems.forEach((menuItem, idx) => {
      if (idx === index) {
        menuItem.isActive = true;
        if (menuItem.subMenus) menuItem.showSubMenus = !menuItem.showSubMenus;
      } else {
        menuItems[idx].isActive = false;
        menuItem.showSubMenus = false;
      }
    });
    menuItems[index].isActive = true;

    setMenu(menuItems);
  };
  return (
    //add context provider
    <>
      <Layout menu={menu} onMenuItemClick={handleMenuItemClick} />
    </>
  );
}

export default App;
