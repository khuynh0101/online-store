import React from 'react';
import styles from './products.module.css';
import globalStyles from '../../app.module.css';
import { useProductsState } from '../Providers/ProductsState';
import { useCartState } from '../Providers/CartState';

export const Products = ({ heading, products }) => {
  const [productItems, setProductItems] = useProductsState();
  const [cartItems, setCartItems] = useCartState();

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
          return (
            <div key={index} className={styles.productFlex}>
              <div>
                <p className={globalStyles.textMedium}>{product.name}</p>
                <p className={`${globalStyles.textSmall} ${styles.price}`}>
                  ${product.price}
                </p>
              </div>
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
