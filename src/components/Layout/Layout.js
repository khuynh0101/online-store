import React from 'react';
import styles from './layout.module.css';
import { Header } from '../Header/Header';
import { Home } from '../Home/Home';
import { Contact } from '../Contact/Contact';
import { Plants } from '../Plants/Plants';
import { WishList } from '../WishList/WishList';
import { Search } from '../Search/Search';
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';
import { Checkout } from '../ShoppingCart/Checkout';
import { Confirmation } from '../Confirmation/Confirmation';
import { SignIn } from '../UserProfile/SignIn';
import { Register } from '../UserProfile/Register';
import { Reset } from '../UserProfile/Reset';
import { Route } from 'react-router-dom';

export const Layout = ({ menu, onMenuItemClick }) => {
  return (
    <>
      <Header />
      <Route path='/plants/:name'>
        <div className={styles.plantContainer}>
          <Plants />
        </div>
      </Route>
      <Route path='/plants' exact>
        <div className={styles.plantContainer}>
          <Plants />
        </div>
      </Route>
      <Route path='/contact'>
        <div className={styles.plantContainer}>
          <Contact />
        </div>
      </Route>
      <Route path='/wishlist'>
        <div className={styles.plantContainer}>
          <WishList />
        </div>
      </Route>
      <Route path='/search/:term'>
        <div className={styles.plantContainer}>
          <Search />
        </div>
      </Route>
      <Route path='/cart'>
        <div className={styles.plantContainer}>
          <ShoppingCart />
        </div>
      </Route>
      <Route path='/checkout'>
        <div className={styles.plantContainer}>
          <Checkout />
        </div>
      </Route>
      <Route path='/confirm/:orderNumber'>
        <div className={styles.plantContainer}>
          <Confirmation />
        </div>
      </Route>
      <Route path='/signin' exact>
        <div className={styles.plantContainer}>
          <SignIn />
        </div>
      </Route>
      <Route path='/register' exact>
        <div className={styles.plantContainer}>
          <Register />
        </div>
      </Route>
      <Route path='/reset' exact>
        <div className={styles.plantContainer}>
          <Reset />
        </div>
      </Route>
      <Route path='/reset/:token'>
        <div className={styles.plantContainer}>
          <Reset />
        </div>
      </Route>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/home' exact>
        <Home />
      </Route>
      <Route path='/index' exact>
        <Home />
      </Route>
    </>
  );
};
