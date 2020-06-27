import React from 'react';
import styles from './checkout.module.css';
import globalStyles from '../../app.module.css';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { useCartState } from '../Providers/CartState';
import { useProductsState } from '../Providers/ProductsState';

export const Checkout = () => {
  const history = useHistory();
  const { cartItems } = useCartState();
  const { getProductsById } = useProductsState();
  const checkboxChecked = null;
  return (
    <section className={globalStyles.container}>
      <p className={globalStyles.textMedium}>Check out</p>
      <div className={styles.container}>
        <div className={styles.billingOrdercontainer}>
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
            <div className={styles.editButton}>
              <button
                className={globalStyles.button}
                onClick={() => {
                  history.push('/cart/');
                }}
              >
                Edit
              </button>
            </div>
          </div>
          <ContactInfo heading='Billing Information' />
        </div>
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            className={styles.checkbox}
            checked={checkboxChecked}
            //onChange={onCheckBoxChanged}
          />
          <span className={globalStyles.textSmall}>
            Shipping address is the same as billing
          </span>
        </label>
        <ContactInfo heading='Shipping Information' />
        <div className={styles.placeOrderButton}>
          <button
            className={globalStyles.button}
            onClick={() => {
              history.push('/placeorder/');
            }}
          >
            Place order
          </button>
        </div>
      </div>
    </section>
  );
};
