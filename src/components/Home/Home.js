import React from 'react';
import styles from './home.module.css';
import globalStyles from '../../app.module.css';
import { ProductsLayout } from '../ProductsLayout/ProductsLayout';
import { useProductsState } from '../Providers/ProductsState';

export const Home = () => {
  const [products, setProducts] = useProductsState();
  const filteredProducts = products.filter((p) => p.recommended);
  return (
    <>
      <section className={styles.heroGrid}>
        <div className={styles.heroGridContent}>
          <p
            className={`${styles.heroGridContentText} ${globalStyles.textLarge}`}
          >
            All kinds of plants for all kinds of homes
          </p>
          <a
            href='index.html'
            className={`${globalStyles.link} ${globalStyles.linkButton}`}
          >
            <span>Shop now</span>
          </a>
        </div>
        <img
          alt='Hero'
          src='/assets/images/hero.png'
          className={styles.heroGridImg}
        />
      </section>
      <ProductsLayout
        heading='Check out our recommendations for your homes'
        products={filteredProducts}
      />
    </>
  );
};
