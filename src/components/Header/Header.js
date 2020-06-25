import React from 'react';
import styles from './header.module.css';
import { Nav } from '../Nav/Nav';
import { Link, Route } from 'react-router-dom';

export const Header = () => {
  return (
    <section className={styles.header}>
      <h1 className={styles.headerTitle}>
        <Link className={styles.headerLink} to='/'>
          Plant Decor
        </Link>
      </h1>
      <Route path='/:menuName/:submenuName'>
        <Nav />
      </Route>
      <Route path='/:menuName' exact>
        <Nav />
      </Route>
      <Route path='/' exact>
        <Nav />
      </Route>
    </section>
  );
};
