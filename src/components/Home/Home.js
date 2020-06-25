import React from 'react';
import styles from './home.module.css';
import globalStyles from '../../app.module.css';
import { Link } from 'react-router-dom';
import { Products } from '../Products/Products';
import { useProductsState } from '../Providers/ProductsState';

export const Home = () => {
  const { getProducts } = useProductsState();
  const filteredProducts = getProducts().filter((p) => p.recommended);
  return (
    <>
      <section className={styles.heroGrid}>
        <div className={styles.heroGridContent}>
          <p
            className={`${styles.heroGridContentText} ${globalStyles.textLarge}`}
          >
            All kinds of plants for all kinds of homes
          </p>
          <Link
            to='/plants/all'
            className={`${globalStyles.link} ${globalStyles.linkButton}`}
          >
            <span>Shop now</span>
          </Link>
        </div>
        <img
          alt='Hero'
          src='/assets/images/hero.png'
          className={styles.heroGridImg}
        />
      </section>
      <Products
        heading='Check out our recommendations for your homes'
        products={filteredProducts}
      />
    </>
  );
};
