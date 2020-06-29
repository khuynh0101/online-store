import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './confirmation.module.css';
import globalStyles from '../../app.module.css';
import { useCartState } from '../Providers/CartState';
import { useContactInfoState } from '../Providers/ContactInfoState';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import { useGetTotalCost } from '../hooks/useGetTotalCost';

export const Confirmation = () => {
  const location = useHistory();
  const { cartItems, removeAllItems } = useCartState();
  //saving copy of cart in local state so that we can clear the CartState provider
  const [cart] = useState(cartItems);
  const [total] = useState(useGetTotalCost());

  useEffect(() => {
    removeAllItems();
  }, []);

  const { getContactInfo } = useContactInfoState();
  const billingInfo = getContactInfo().billing;
  const shippingInfo = getContactInfo().isSameContact
    ? billingInfo
    : getContactInfo().shipping;

  if (billingInfo.firstName.length === 0) location.push('/');
  const renderContactInfo = (contactInfo) => {
    return (
      <>
        <div
          className={globalStyles.textSmall}
        >{`${contactInfo.firstName} ${contactInfo.lastName}`}</div>
        <div className={globalStyles.textSmall}>{contactInfo.address}</div>
        {contactInfo.apt.length != 0 && (
          <div className={globalStyles.textSmall}>{contactInfo.apt}</div>
        )}
        <div
          className={globalStyles.textSmall}
        >{`${contactInfo.city} ${contactInfo.state}, ${contactInfo.zipCode}`}</div>
        <div className={globalStyles.textSmall}>{contactInfo.phoneNumber}</div>
      </>
    );
  };
  return (
    <section className={globalStyles.container}>
      <p className={globalStyles.textLarge}>Thank you.</p>
      <p>Your order has been placed!</p>
      <div className={styles.location}>
        <div className={styles.contactInfo}>
          <p className={globalStyles.textMedium}>Shipping</p>
          {renderContactInfo(shippingInfo)}
        </div>
        <div className={styles.contactInfo}>
          <p className={globalStyles.textMedium}>Billing Details</p>
          {renderContactInfo(billingInfo)}
        </div>
      </div>
      <div className={styles.orderDetails}>
        <OrderSummary showEditButton={false} carts={cart} total={total} />
      </div>
    </section>
  );
};
