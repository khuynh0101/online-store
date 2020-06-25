import React from 'react';
import styles from './products.module.css';
import globalStyles from '../../app.module.css';
import { useProductsState } from '../Providers/ProductsState';
import { useCartState } from '../Providers/CartState';
import { useWishListStore } from '../hooks/useWishListStore';

export const Products = ({ heading, products }) => {
  const [productItems, setProductItems] = useProductsState();
  const [cartItems, setCartItems] = useCartState();

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

  const handleMouseEnter = (id) => {
    //const { product, productList } = getProduct(id);
    let { item, items } = getItem(productItems, id);
    item.isSelected = true;
    setProductItems(items);
  };
  const handleMouseOut = (id) => {
    //const { product, productList } = getProduct(id);
    let { item, items } = getItem(productItems, id);
    item.isSelected = false;
    setProductItems(items);
  };

  const handleToggleToCart = (id) => {
    let { item, items, index } = getItem(cartItems, id);
    if (item) {
      items.splice(index, 1);
    } else {
      item = {
        id: id,
        numItem: 1,
      };
      items.push(item);
    }
    setCartItems(items);
  };
  const getItem = (itemList, id) => {
    const items = [...itemList];
    const index = items.findIndex((p) => p.id === id);
    const itemObj = items.filter((p) => p.id === id);
    let item = null;
    if (itemObj && itemObj.length > 0) {
      item = itemObj[0];
    }
    return { item, items, index };
  };
  const isInCart = (product) => {
    let { item, items, index } = getItem(cartItems, product.id);
    return index > -1;
  };
  return (
    <section className={styles.productsContainer}>
      <p
        className={`${styles.paragraphLeftPadding} ${globalStyles.textMedium}`}
      >
        {heading}
      </p>
      <div className={styles.productsContentGrid}>
        {products.map((product, index) => {
          const wishListSelectedClassName =
            wishListItems.indexOf(product.id) > -1 ? styles.selected : null;
          return (
            <div key={index} className={styles.productFlex}>
              <div className={styles.wishlist}>
                <p
                  className={`${globalStyles.textMedium} ${styles.productName}`}
                >
                  {product.name}
                </p>
                <svg
                  onClick={() => handleWishlistClick(product.id)}
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
                ${product.price}
              </p>
              <div
                className={styles.productBackgroundGradient}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={() => handleMouseOut(product.id)}
              >
                <img
                  alt={product.name}
                  className={styles.imgPlant}
                  src={product.url}
                />
                {product.isSelected && (
                  <>
                    <div className={styles.addCartButton}>
                      <button
                        className={globalStyles.button}
                        type='button'
                        onClick={() => handleToggleToCart(product.id)}
                      >
                        {isInCart(product) && `Remove from cart`}
                        {!isInCart(product) && `Add to cart`}
                        {/* {product.addedToCart && `Remove from cart`}
                        {!product.addedToCart && `Add to cart`} */}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
