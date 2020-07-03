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
        <Link to='/signin' className={globalStyles.Link}>
          <svg
            className={styles.svgImg}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path
              className={globalStyles.svgLinkFillColor}
              d='M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z'
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
};
