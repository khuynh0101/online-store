import React, { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import globalStyles from '../../app.module.css';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import {
  ContactProps,
  useContactInfoState,
} from '../Providers/ContactInfoState';
import { useGetTotalCost } from '../hooks/useGetTotalCost';

export const Checkout = () => {
  const history = useHistory();
  const [enableOrderButton, setEnableOrderButton] = useState(false);
  const [errors, setErrors] = useState({
    billing: {
      firstName: false,
      lastName: false,
      address: false,
      city: false,
      state: false,
      zipCode: false,
      phoneNumber: false,
    },
    shipping: {
      firstName: false,
      lastName: false,
      address: false,
      city: false,
      state: false,
      zipCode: false,
      phoneNumber: false,
    },
  });

  const {
    getContactInfo,
    toggleSameContact,
    updateBillingContact,
    updateShippingContact,
  } = useContactInfoState();

  useEffect(() => {
    setEnableOrderButton(isFormValid());
  });

  const isFormValid = () => {
    let enableOrderButton = true;
    const contactBilling = getContactInfo().billing;
    const contactShipping = getContactInfo().shipping;
    Object.values(ContactProps).forEach(function (value, index) {
      if (value != ContactProps.APT) {
        if (
          enableOrderButton &&
          value === ContactProps.ZIP_CODE &&
          contactBilling[value].length !== 5
        )
          enableOrderButton = false;
        if (
          enableOrderButton &&
          value === ContactProps.PHONE_NUMBER &&
          contactBilling[value].length !== 12
        )
          enableOrderButton = false;
        if (enableOrderButton && contactBilling[value].length === 0)
          enableOrderButton = false;
        //validate shipping if billing is all valid and users has different shipping information
        if (enableOrderButton && !getContactInfo().isSameContact) {
          if (
            enableOrderButton &&
            value === ContactProps.ZIP_CODE &&
            contactShipping[value].length !== 5
          )
            enableOrderButton = false;
          if (
            enableOrderButton &&
            value === ContactProps.PHONE_NUMBER &&
            contactShipping[value].length !== 12
          )
            enableOrderButton = false;
          if (enableOrderButton && contactShipping[value].length === 0)
            enableOrderButton = false;
        }
      }
    });
    return enableOrderButton;
  };

  const toggleSameAddress = () => {
    toggleSameContact();
  };

  const handleListChanged = (e, id, isBilling) => {
    if (isBilling) updateBillingContact(id, e.target.value);
    else updateShippingContact(id, e.target.value);
  };

  const handleOnBlur = (e, id, isBilling) => {
    const errorStates = { ...errors };
    const error = isBilling ? errorStates.billing : errorStates.shipping;
    error[id] = e.target.value.trim().length === 0;
    if (!error[id])
      switch (id) {
        case ContactProps.ZIP_CODE:
          error[id] = e.target.value.trim().length !== 5;
          break;
        case ContactProps.PHONE_NUMBER:
          error[id] = e.target.value.trim().length !== 12;
          break;
      }
    setErrors(errorStates);
  };
  const updateContactInfo = (id, value, isBilling) => {
    if (isBilling) updateBillingContact(id, value);
    else updateShippingContact(id, value);
  };
  const handlePlaceOrderClick = () => {
    history.push('/confirm');
  };
  return (
    <section className={globalStyles.container}>
      <p className={globalStyles.textMedium}>Check out</p>
      <div className={styles.container}>
        <div className={styles.billingOrdercontainer}>
          <OrderSummary />
          <ContactInfo
            heading='Billing Information'
            errors={errors.billing}
            onStateChange={(event, id) => handleListChanged(event, id, true)}
            onChange={(event, id) =>
              updateContactInfo(id, event.target.value, true)
            }
            contactInfo={getContactInfo().billing}
            onBlur={(event, id) => handleOnBlur(event, id, true)}
            hasFocus={true}
          />
        </div>
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            className={styles.checkbox}
            checked={getContactInfo().isSameContact ? 'checked' : false}
            onChange={toggleSameAddress}
          />
          <span className={globalStyles.textSmall}>
            Shipping address is the same as billing
          </span>
        </label>
        {!getContactInfo().isSameContact && (
          <ContactInfo
            errors={errors.shipping}
            heading='Shipping Information'
            onStateChange={(event, id) => handleListChanged(event, id, false)}
            onChange={(event, id) =>
              updateContactInfo(id, event.target.value, false)
            }
            contactInfo={getContactInfo().shipping}
            onBlur={(event, id) => handleOnBlur(event, id, false)}
          />
        )}

        <div className={styles.placeOrderButton}>
          <button
            disabled={!enableOrderButton}
            className={globalStyles.button}
            onClick={handlePlaceOrderClick}
          >
            Place order
          </button>
        </div>
      </div>
    </section>
  );
};
