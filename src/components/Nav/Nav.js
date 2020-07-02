import React, { useEffect } from 'react';
import styles from './nav.module.css';
import globalStyles from '../../app.module.css';
import { useParams } from 'react-router-dom';
import { SearchTextBox } from '../Search/SearchTextBox';
import { Cart } from '../ShoppingCart/Cart';
import { Link } from 'react-router-dom';
import { useNavStore } from '../../components/hooks/useNavStore';

export const Nav = () => {
  const { getMenu, selectMenuItem, toggleSubMenu } = useNavStore();
  const { menuName } = useParams();
  //set the nav selected menu item only if menuName exists
  useEffect(() => {
    if (menuName) {
      let menuItems = getMenu();
      menuItems.forEach((menuItem, idx) => {
        if (menuItem.Name.toLowerCase() === menuName.trim()) {
          selectMenuItem(idx, false);
        }
      });
    }
  }, []);

  const renderSubMenu = (subMenus, parentIndex) => {
    return (
      <ul
        className={`${styles.navContainerSubItems} ${styles.show}`}
        onMouseLeave={() => toggleSubMenu(parentIndex)}
      >
        {subMenus.map((subMenuItem, index) => {
          return (
            <li key={index} className={styles.navContainerSubitem}>
              <Link
                className={globalStyles.link}
                to={subMenuItem.Url}
                onClick={() => toggleSubMenu(parentIndex)}
              >
                <span>{subMenuItem.Name}</span>
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
        {getMenu().map((menuItem, index) => {
          let svgArrowClassName = styles.svgArrow;
          let liClassName = styles.navContainerItem;
          let selectedClassName = menuItem.IsActive
            ? `${globalStyles.link} ${globalStyles.active}`
            : globalStyles.link;
          if (menuItem.SubMenus && menuItem.SubMenus.length > 0) {
            selectedClassName = menuItem.SubMenus
              ? `${selectedClassName} ${styles.linkArrow}`
              : '';
            liClassName = `${liClassName} ${styles.subItems}`;
          }
          svgArrowClassName = menuItem.ShowSubMenus
            ? `${svgArrowClassName} ${styles.svgArrowUp}`
            : `${svgArrowClassName} ${styles.svgArrowDown}`;
          return (
            <li key={index} className={liClassName}>
              <Link
                className={selectedClassName}
                to={menuItem.Url}
                onClick={(event) => selectMenuItem(index)}
              >
                <span>{menuItem.Name}</span>
                {menuItem.SubMenus && menuItem.SubMenus.length > 0 && (
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
              {menuItem.ShowSubMenus
                ? renderSubMenu(menuItem.SubMenus, index)
                : null}
            </li>
          );
        })}
      </ul>
      <div className={styles.navAction}>
        <SearchTextBox />
        <Cart />
      </div>
    </nav>
  );
};
