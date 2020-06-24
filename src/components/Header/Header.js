import React from 'react';
import styles from './header.module.css';
import { Nav } from '../Nav/Nav';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <section className={styles.header}>
      <h1 className={styles.headerTitle}>
        <Link className={styles.headerLink} to='/'>
          Plant Decor
        </Link>
      </h1>
      <Nav />
    </section>
  );
};
