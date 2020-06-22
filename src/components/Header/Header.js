import React from 'react';
import './Header.css';
import { Nav } from '../../components/Nav/Nav';

export const Header = () => {
  return (
    <section class='header'>
      <h1 class='header-title'>
        <a class='header-link' href='index.html'>
          Plant Decor
        </a>
      </h1>
      <Nav />
    </section>
  );
};
