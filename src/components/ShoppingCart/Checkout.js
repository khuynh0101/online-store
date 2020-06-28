import React, { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import globalStyles from '../../app.module.css';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { useCartState } from '../Providers/CartState';
import { useProductsState } from '../Providers/ProductsState';
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

  const { cartItems } = useCartState();
  const { getProductsById } = useProductsState();
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
        //validate shipping if billing is all valid and users had different shipping information
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

  const handleTextChanged = (e, id, isBilling) => {
    const value = e.target.value.replace(/[^0-9A-Za-z\s.'#-]/gi, '');
    if (isBilling) updateBillingContact(id, value);
    else updateShippingContact(id, value);
  };
  const handleListChanged = (e, id, isBilling) => {
    if (isBilling) updateBillingContact(id, e.target.value);
    else updateShippingContact(id, e.target.value);
  };
  const handleZipCodeChanged = (e, id, isBilling) => {
    let value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length > 5) value = value.substring(0, 5);
    if (isBilling) updateBillingContact(id, value);
    else updateShippingContact(id, value);
  };

  const handleTelephoneChanged = (e, id, isBilling) => {
    let value = e.target.value.replace(/[^0-9-]/gi, '');
    let currentValue = value.split('-').join('');

    let newValue = currentValue;
    if (currentValue.length <= 10) {
      if (currentValue.length > 3) {
        newValue = currentValue.substr(0, 3) + '-' + currentValue.substr(3);
      }
      if (currentValue.length > 6) {
        newValue =
          currentValue.substr(0, 3) +
          '-' +
          currentValue.substr(3, 3) +
          '-' +
          currentValue.substr(6);
      }
      if (isBilling) updateBillingContact(id, newValue);
      else updateShippingContact(id, newValue);
    }
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
              <p className={styles.totalAmount}>${useGetTotalCost()}</p>
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

          <ContactInfo
            heading='Billing Information'
            errors={errors.billing}
            onTextChange={(event, id) => handleTextChanged(event, id, true)}
            onStateChange={(event, id) => handleListChanged(event, id, true)}
            onZipCodeChange={(event, id) =>
              handleZipCodeChanged(event, id, true)
            }
            onTelephoneChange={(event, id) =>
              handleTelephoneChanged(event, id, true)
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
            onTextChange={(event, id) => handleTextChanged(event, id, false)}
            onZipCodeChange={(event, id) =>
              handleZipCodeChanged(event, id, false)
            }
            onTelephoneChange={(event, id) =>
              handleTelephoneChanged(event, id, false)
            }
            contactInfo={getContactInfo().shipping}
            onBlur={(event, id) => handleOnBlur(event, id, false)}
          />
        )}

        <div className={styles.placeOrderButton}>
          <button
            disabled={!enableOrderButton}
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
