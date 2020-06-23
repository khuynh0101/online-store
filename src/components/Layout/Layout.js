import React from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';

export const Layout = ({ menu, onMenuItemClick }) => {
  //add routing here
  return (
    <section className='header'>
      <Header />
      <Nav menu={menu} onMenuItemClick={onMenuItemClick} />
    </section>
  );
};
