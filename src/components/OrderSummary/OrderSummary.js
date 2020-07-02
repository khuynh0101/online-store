import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './orderSummary.module.css';
import globalStyles from '../../app.module.css';
import { useCartState } from '../Providers/CartState';
import { useProductsState } from '../Providers/ProductsState';
import { useGetTotalCost } from '../hooks/useGetTotalCost';

export const OrderSummary = ({
  showEditButton = true,
  carts,
  total = null,
}) => {
  const history = useHistory();
  const { cartItems } = useCartState();
  const { getProductsById } = useProductsState();

  if (!carts) carts = cartItems;
  let totalCost = useGetTotalCost();
  if (total) totalCost = total;
  return (
    <div className={styles.orderSummary}>
      <p className={globalStyles.textMedium}>Order Summary</p>
      <ul className={styles.order}>
        <li>Description</li>
        <li className={styles.orderAmount}>Amount</li>
        <li className={styles.orderTotal}>Total</li>
      </ul>
      {carts.map((cartItem, index) => {
        const product = getProductsById(cartItem.id);
        return (
          <ul key={index} className={styles.order}>
            <li
              className={`${globalStyles.textSmall} ${styles.orderProductName}`}
            >
              {product.Name}
            </li>
            <li className={`${globalStyles.textSmall} ${styles.orderAmount}`}>
              {cartItem.numItem}
            </li>
            <li className={`${globalStyles.textSmall} ${styles.orderTotal}`}>
              ${cartItem.numItem * product.Price}
            </li>
          </ul>
        );
      })}

      <div className={styles.totalFlex}>
        <p className={styles.totalText}>Total:</p>
        <p className={styles.totalAmount}>${totalCost}</p>
      </div>
      {showEditButton && (
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
      )}
    </div>
  );
};
