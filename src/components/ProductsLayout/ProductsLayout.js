import React from 'react';
import styles from './productsLayout.module.css';
import globalStyles from '../../app.module.css';
import { useProductsState } from '../Providers/ProductsState';

export const ProductsLayout = ({ heading, products }) => {
  const [productItems, setProductItems] = useProductsState();

  const handleToggle = (id) => {
    const { product, productList } = getProduct(id);
    if (!product.isSelected) product.isSelected = false;
    product.isSelected = !product.isSelected;
    setProductItems(productList);
  };

  const handleAddToCart = (id) => {
    const { product, productList } = getProduct(id);
    if (!product.addedToCart) product.addedToCart = false;
    product.addedToCart = !product.addedToCart;
    console.log(product);
    setProductItems(productList);
  };

  const getProduct = (id) => {
    const productList = [...productItems];
    const productItem = productList.filter((p) => p.id === id);
    let product = null;
    if (productItem && productItem.length > 0) {
      product = productItem[0];
    }
    return { product, productList };
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
                onMouseEnter={() => handleToggle(product.id)}
                onMouseLeave={() => handleToggle(product.id)}
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
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {product.addedToCart && `Remove`}
                        {!product.addedToCart && `Add`}
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
