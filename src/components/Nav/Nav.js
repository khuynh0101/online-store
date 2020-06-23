import React, { useState } from 'react';
import styles from './nav.module.css';
import globalStyles from '../../app.module.css';
import { SearchTextBox } from '../Search/SearchTextBox';
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavState } from '../../components/Providers/NavState';

export const Nav = () => {
  const [navState, setNavState] = useNavState();

  const handleMenuItemClick = (event, index) => {
    let menuItems = [...navState];
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
    setNavState(menuItems);
  };

  const handleSubMenuItemClick = (event, parentIndex, index) => {
    const menuItems = [...navState];
    const menuItem = menuItems[parentIndex];
    menuItem.showSubMenus = !menuItem.showSubMenus;
    const subMenuItems = menuItem.subMenus;
    setNavState(menuItems);
  };

  const renderSubMenu = (subMenus, parentIndex) => {
    return (
      <ul className={`${styles.navContainerSubItems} ${styles.show}`}>
        {subMenus.map((subMenuItem, index) => {
          return (
            <li key={index} className={styles.navContainerSubitem}>
              <Link
                className={globalStyles.link}
                to={subMenuItem.url}
                onClick={(event) =>
                  handleSubMenuItemClick(event, parentIndex, index)
                }
              >
                <span>{subMenuItem.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navContainerItems}>
        {navState.map((menuItem, index) => {
          let svgArrowClassName = styles.svgArrow;
          let liClassName = styles.navContainerItem;
          let selectedClassName = menuItem.isActive
            ? `${globalStyles.link} ${globalStyles.active}`
            : globalStyles.link;
          if (menuItem.subMenus) {
            selectedClassName = menuItem.subMenus
              ? `${selectedClassName} ${styles.linkArrow}`
              : '';
            liClassName = `${liClassName} ${styles.subItems}`;
          }
          svgArrowClassName = menuItem.showSubMenus
            ? `${svgArrowClassName} ${styles.svgArrowUp}`
            : `${svgArrowClassName} ${styles.svgArrowDown}`;
          return (
            <li key={index} className={liClassName}>
              <Link
                className={selectedClassName}
                to={menuItem.url}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                <span>{menuItem.name}</span>
                {menuItem.subMenus && (
                  <svg
                    className={svgArrowClassName}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='#3b9288'
                    width='18px'
                    height='18px'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
                  </svg>
                )}
              </Link>
              {menuItem.showSubMenus
                ? renderSubMenu(menuItem.subMenus, index)
                : null}
            </li>
          );
        })}
      </ul>
      <div className={styles.navAction}>
        <SearchTextBox />
        <ShoppingCart />
      </div>
    </nav>
  );
};
