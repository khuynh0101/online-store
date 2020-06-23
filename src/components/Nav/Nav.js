import React, { useState } from 'react';
import './Nav.css';
import { SearchTextBox } from '../Search/SearchTextBox';
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
      <ul className='nav-container-subitems show'>
        {subMenus.map((subMenuItem, index) => {
          return (
            <li key={index} className='nav-container-subitem'>
              <Link
                className='link'
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
    <nav className='nav-container'>
      <ul className='nav-container-items'>
        {navState.map((menuItem, index) => {
          let svgArrowClassName = 'svg-arrow';
          let liClassName = 'nav-container-item';
          let selectedClassName = menuItem.isActive ? 'link active' : 'link';
          if (menuItem.subMenus) {
            selectedClassName = menuItem.subMenus
              ? `${selectedClassName} link-arrow`
              : '';
            liClassName = `${liClassName} subitems`;
          }
          svgArrowClassName = menuItem.showSubMenus
            ? `${svgArrowClassName} svg-arrow-up`
            : `${svgArrowClassName} svg-arrow-down`;
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
      <div className='nav-action'>
        <SearchTextBox />
        <a className='link cart'>
          <span className='cart-flex'>
            <svg
              className='svg-img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path
                className='svg-action'
                d='M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z'
              />
            </svg>
            <span className='counter'>1</span>
          </span>
        </a>
      </div>
      {/* <ul className='nav-container-items'>
        <li className='nav-container-item'>
          <a className='link' href='index.html'>
            <span>Home</span>
          </a>
        </li>
        <li className='nav-container-item subitems' href='plants.html'>
          <a
            className='link link-arrow'
            href='index.html'
            onClick='handleMenuClick'
          >
            <span>Plants</span>
            <svg
              className='svg-arrow'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='#3b9288'
              width='18px'
              height='18px'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z' />
            </svg>
          </a>
          <ul className='nav-container-subitems hide'>
            <li className='nav-container-subitem'>
              <a className='link' href='#'>
                <span>Bonsai</span>
              </a>
            </li>
            <li className='nav-container-subitem'>
              <a className='link' href='#'>
                <span>Hanging Basket</span>
              </a>
            </li>
            <li className='nav-container-subitem'>
              <a className='link' href='#'>
                <span>Palm</span>
              </a>
            </li>
            <li className='nav-container-subitem'>
              <a className='link' href='#'>
                <span>Succulent</span>
              </a>
            </li>
          </ul>
        </li>
        <li className='nav-container-item'>
          <a className='link' href='index.html'>
            <span>WishList</span>
          </a>
        </li>
        <li className='nav-container-item'>
          <a className='link' href='index.html'>
            <span>Contact</span>
          </a>
        </li>
      </ul> */}
      {/* <div className='nav-action'>
        <div className='nav-action-search'>
          <input className='input-search' type='text' placeholder='Search' />
          <svg
            className='nav-action-search-img svg-img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path
              className='svg-action'
              d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
            />
          </svg>
        </div>
        <a className='link cart'>
          <span className='cart-flex'>
            <svg
              className='svg-img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path
                className='svg-action'
                d='M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z'
              />
            </svg>
            <span className='counter'>1</span>
          </span>
        </a>
      </div> */}
    </nav>
  );
};
