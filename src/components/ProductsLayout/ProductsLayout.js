import React from 'react';
import styles from './productsLayout.module.css';
import globalStyles from '../../app.module.css';

export const ProductsLayout = ({ heading, pageType = 'home' }) => {
  const backgroundClassName = styles.productBackgroundGradient;
  if (pageType != 'home') backgroundClassName = null;
  return (
    <section className={styles.productsContainer}>
      <p
        className={`${styles.paragraphLeftPadding} ${globalStyles.textMedium}`}
      >
        {heading}
      </p>
      <div className={styles.productsContentGrid}>
        <div className={`${styles.productFlex} ${backgroundClassName}`}>
          <div>
            <p className={globalStyles.textMedium}>Bonsai Tree</p>
            <p className={`${globalStyles.textSmall} ${styles.price}`}>$35</p>
          </div>
          <img
            className={styles.imgPlant}
            src='/assets/images/plants/bonsai_1.png'
          />
        </div>
        <div className={`${styles.productFlex} ${backgroundClassName}`}>
          <div>
            <p className={globalStyles.textMedium}>Potted Palm Tree</p>
            <p className={`${globalStyles.textSmall} ${styles.price}`}>$15</p>
          </div>
          <img
            className={styles.imgPlant}
            src='/assets/images/plants/palm_1.png'
          />
        </div>
        <div className={`${styles.productFlex} ${backgroundClassName}`}>
          <div>
            <p className={globalStyles.textMedium}>Bonsai Tree</p>
            <p className={`${globalStyles.textSmall} ${styles.price}`}>$45</p>
          </div>
          <img
            className={styles.imgPlant}
            src='./assets/images/plants/succulent_1.png'
          />
        </div>
      </div>
    </section>
  );
};
