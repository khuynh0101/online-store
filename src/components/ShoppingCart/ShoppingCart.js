import React from 'react';
import styles from './shoppingCart.module.css';
import globalStyles from '../../app.module.css';
import { useProductsState } from '../Providers/ProductsState';
import { useCartState } from '../Providers/CartState';

export const ShoppingCart = () => {
  const { getProducts } = useProductsState();
  const {
    cartItems,
    removeItem,
    increaseCount,
    decreaseCount,
  } = useCartState();

  const getProduct = (id) => {
    const prod = getProducts().filter((p) => p.id === id);
    if (prod && prod.length > 0) return prod[0];
    return null;
  };

  return (
    <section className={globalStyles.container}>
      <p
        className={`${globalStyles.paragraphLeftPadding} ${globalStyles.textMedium}`}
      >
        Shopping Bag
      </p>
      <div className={styles.shoppingBagContainer}>
        {cartItems.length === 0 && (
          <p
            className={`${styles.paragraphLeftPadding} ${globalStyles.textMedium}`}
          >
            Your bag is empty.
          </p>
        )}
        {cartItems.map((cartItem, index) => {
          const product = getProduct(cartItem.id);
          {
            return (
              product && (
                <ul key={index} className={styles.shoppingBag}>
                  <li>
                    <a
                      className={`${globalStyles.link} ${styles.linkSvgImg}`}
                      href='#'
                      onClick={() => removeItem(index)}
                    >
                      <svg
                        className={styles.svgImg}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M0 0h24v24H0z' fill='none' />
                        <path
                          className={styles.svgAction}
                          d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                        />
                      </svg>
                    </a>
                  </li>
                  <li className={styles.imgPlantGradient}>
                    <img className={styles.imgPlant} src={product.url} />
                  </li>
                  <li>
                    <span className={globalStyles.textMedium}>
                      {product.name}
                    </span>
                  </li>
                  <li className={styles.itemCounterFlex}>
                    <a
                      className={`${globalStyles.link} ${styles.linkSvgImg}`}
                      href='#'
                      onClick={() => increaseCount(cartItem.id)}
                    >
                      <svg
                        className={styles.svgImg}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M0 0h24v24H0z' fill='none' />
                        <path
                          className={styles.svgAction}
                          d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
                        />
                      </svg>
                    </a>
                    <div
                      className={`${globalStyles.textMedium} ${styles.counter}`}
                    >
                      <span>{cartItem.numItem}</span>
                    </div>
                    <a
                      className={`${globalStyles.link} ${styles.linkSvgImg}`}
                      href='#'
                      onClick={() => decreaseCount(cartItem.id)}
                    >
                      <svg
                        className={styles.svgImg}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M0 0h24v24H0z' fill='none' />
                        <path
                          className={styles.svgAction}
                          d='M19 13H5v-2h14v2z'
                        />
                      </svg>
                    </a>
                  </li>
                  <li className={styles.amount}>
                    <span className={styles.textMedium}>
                      ${cartItem.numItem * product.price}
                    </span>
                  </li>
                </ul>
              )
            );
          }
        })}
      </div>
    </section>
  );
};
