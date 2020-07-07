import React, { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import globalStyles from '../../app.module.css';
import { useHistory } from 'react-router-dom';
import { Input } from '../DataEntry/Input/Input';
import { ContactInfo } from './ContactInfo';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import { useCartState } from '../Providers/CartState';
import { useSecurityState } from '../Providers/SecurityState';
import { saveContactInformation } from '../APIs/UserAPI';
import {
  ContactProps,
  useContactInfoState,
} from '../Providers/ContactInfoState';
import { useGetTotalCost } from '../hooks/useGetTotalCost';

export const Checkout = () => {
  const history = useHistory();
  const { cartItems } = useCartState();
  const { isLoggedIn, getEncodedData } = useSecurityState();
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
    contact,
    toggleSameContact,
    updateBillingContact,
    updateShippingContact,
    toggleSaveContactInformation,
  } = useContactInfoState();

  useEffect(() => {
    setEnableOrderButton(isFormValid());
  });

  const isFormValid = () => {
    let enableOrderButton = true;
    const contactBilling = contact.billing;
    const contactShipping = contact.shipping;
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
        if (enableOrderButton && !contact.isSameContact) {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);

    if (isLoggedIn && contact.saveContactInformation) {
      const encodedData = getEncodedData();
      saveContactInformation(
        encodedData,
        {
          BillingContact: {
            FirstName: contact.billing.firstName,
            LastName: contact.billing.lastName,
            Address: contact.billing.address,
            Apt: contact.billing.apt,
            City: contact.billing.city,
            State: contact.billing.state,
            ZipCode: contact.billing.zipCode,
            PhoneNumber: contact.billing.phoneNumber,
          },
          ShippingContact: {
            FirstName: contact.shipping.firstName,
            LastName: contact.shipping.lastName,
            Address: contact.shipping.address,
            Apt: contact.shipping.apt,
            City: contact.shipping.city,
            State: contact.shipping.state,
            ZipCode: contact.shipping.zipCode,
            PhoneNumber: contact.shipping.phoneNumber,
          },
        },
        savedContactCompleted
      );
    }
    //history.push('/confirm');
  };

  const savedContactCompleted = (result) => {
    //after saving contact information, will place order
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className={globalStyles.container}>
        <p className={globalStyles.textMedium}>Check out</p>
        <div className={styles.container}>
          <div className={styles.billingOrdercontainer}>
            <OrderSummary carts={cartItems} />
            <ContactInfo
              heading='Billing Information'
              errors={errors.billing}
              onStateChange={(event, id) => handleListChanged(event, id, true)}
              onChange={(event, id) =>
                updateContactInfo(id, event.target.value, true)
              }
              contactInfo={contact.billing}
              onBlur={(event, id) => handleOnBlur(event, id, true)}
              hasFocus={true}
            />
          </div>
          <Input
            type='checkbox'
            value={contact.isSameContact ? 'checked' : false}
            onChange={toggleSameContact}
            name='Shipping address is the same as billing'
          />
          {!contact.isSameContact && (
            <ContactInfo
              errors={errors.shipping}
              heading='Shipping Information'
              onStateChange={(event, id) => handleListChanged(event, id, false)}
              onChange={(event, id) =>
                updateContactInfo(id, event.target.value, false)
              }
              contactInfo={contact.shipping}
              onBlur={(event, id) => handleOnBlur(event, id, false)}
            />
          )}

          <div className={styles.placeOrderButtonContainer}>
            {isLoggedIn && (
              <Input
                type='checkbox'
                value={contact.saveContactInformation ? 'checked' : false}
                onChange={toggleSaveContactInformation}
                name='Save contact information'
              />
            )}
            <button
              disabled={!enableOrderButton}
              className={`${globalStyles.button} ${styles.placeOrderButton}`}
              //onClick={handlePlaceOrderClick}
            >
              Place order
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};
