import React from 'react';
import { Link } from 'react-router-dom';
import styles from './checkout.module.css';
import globalStyles from '../../app.module.css';
import { useCartState } from '../Providers/CartState';
import { useProductsState } from '../Providers/ProductsState';

export const Checkout = () => {
  const { cartItems } = useCartState();
  const { getProductsById } = useProductsState();
  return (
    <section className={globalStyles.container}>
      <p
        className={`${globalStyles.paragraphLeftPadding} ${globalStyles.textMedium}`}
      >
        Order summary and check out
      </p>
      <div className={styles.container}>
        <div className={styles.orderSummary}>
          <p className={globalStyles.textMedium}>Order Summary</p>
          <ul className={styles.order}>
            <li>Description</li>
            <li className={styles.orderAmount}>Amount</li>
            <li className={styles.orderTotal}>Total</li>
          </ul>
          {cartItems.map((cartItem, index) => {
            const product = getProductsById(cartItem.id);
            return (
              <ul key={index} className={styles.order}>
                <li
                  className={`${globalStyles.textSmall} ${styles.orderProductName}`}
                >
                  {product.name}
                </li>
                <li
                  className={`${globalStyles.textSmall} ${styles.orderAmount}`}
                >
                  {cartItem.numItem}
                </li>
                <li
                  className={`${globalStyles.textSmall} ${styles.orderTotal}`}
                >
                  ${cartItem.numItem * product.price}
                </li>
              </ul>
            );
          })}

          <div className={styles.totalFlex}>
            <p className={styles.totalText}>Total:</p>
            <p className={styles.totalAmount}>$232</p>
          </div>
        </div>
        <div className={styles.billing}>
          <p className={globalStyles.textMedium}>Billing Information</p>
          <div>
            <div>
              <span className={globalStyles.textSmall}>First Name:</span>
              <input type='text' className={styles.input} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
