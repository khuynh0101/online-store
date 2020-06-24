import React from 'react';
import styles from './layout.module.css';
import { Header } from '../Header/Header';
import { Home } from '../Home/Home';
import { Contact } from '../Contact/Contact';
import { Plants } from '../Plants/Plants';
import { Route } from 'react-router-dom';

export const Layout = ({ menu, onMenuItemClick }) => {
  return (
    <>
      <Header />
      <div className={styles.plantContainer}>
        <Route path='/plants/:name'>
          <Plants />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/wishlist'></Route>
        <Route path='/search/:term'></Route>
        <Route path='/cart'></Route>
      </div>
      <Route path='/' exact>
        <Home />
      </Route>
    </>
  );
};
