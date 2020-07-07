import React from 'react';
import styles from './products.module.css';
import globalStyles from '../../app.module.css';
import { useProductsState } from '../Providers/ProductsState';
import { useCartState } from '../Providers/CartState';
import { useWishListStore } from '../hooks/useWishListStore';

export const Products = ({ heading, products }) => {
  const { selectProductItem, deSelectProductItem } = useProductsState();
  const { toggleToCart, inCart } = useCartState();

  const {
    getWishList,
    addWishListItem,
    removeWishListItem,
  } = useWishListStore();
  const wishListItems = getWishList();

  const handleWishlistClick = (id) => {
    if (getWishList().indexOf(id) > -1) removeWishListItem(id);
    else addWishListItem(id);
  };

  return (
    <section className={globalStyles.container}>
      <p className={globalStyles.textMedium}>{heading}</p>
      <div className={styles.productsContentGrid}>
        {products.map((product, index) => {
          const wishListSelectedClassName =
            wishListItems.indexOf(product.ProductId) > -1
              ? styles.selected
              : null;
          return (
            <div key={index} className={styles.productFlex}>
              <div className={styles.wishlist}>
                <p
                  className={`${globalStyles.textMedium} ${styles.productName}`}
                >
                  {product.Name}
                </p>
                <svg
                  onClick={() => handleWishlistClick(product.ProductId)}
                  className={styles.svgImg}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path
                    className={`${styles.svgAction} ${wishListSelectedClassName}`}
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                  />
                </svg>
              </div>
              <p className={`${globalStyles.textSmall} ${styles.price}`}>
                ${product.Price}
              </p>
              <div
                className={styles.productBackgroundGradient}
                onMouseEnter={() => selectProductItem(product.ProductId)}
                onMouseLeave={() => deSelectProductItem(product.ProductId)}
              >
                <img
                  alt={product.Name}
                  className={styles.imgPlant}
                  src={product.Url}
                />
              </div>
              <div>
                <button
                  className={globalStyles.button}
                  type='button'
                  onClick={() => toggleToCart(product.ProductId, product.Price)}
                >
                  {inCart(product.ProductId) && `Remove from cart`}
                  {!inCart(product.ProductId) && `Add to cart`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
