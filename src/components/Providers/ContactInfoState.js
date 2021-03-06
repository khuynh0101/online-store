import React, { useContext, useState, useEffect } from 'react';
import { useSecurityState } from './SecurityState';
import { getContactInformation } from '../APIs/UserAPI';
export const ContactProps = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ADDRESS: 'address',
  APT: 'apt',
  CITY: 'city',
  STATE: 'state',
  ZIP_CODE: 'zipCode',
  PHONE_NUMBER: 'phoneNumber',
  EMAIL: 'email',
};

const ContactInfoStateContext = React.createContext();
export const ContactInfoStateProvider = ({ children }) => {
  const { getEncodedData } = useSecurityState();

  const [contact, setContact] = useState({
    billing: {
      firstName: '',
      lastName: '',
      address: '',
      apt: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      email: '',
    },
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      apt: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    },
    isSameContact: false,
    saveContactInformation: false,
  });

  useEffect(() => {
    const encodedData = getEncodedData();
    if (encodedData)
      getContactInformation(encodedData, getContactInformationCompleted);
  }, []);

  const getContactInformationCompleted = (result) => {
    const contact = {
      billing: {
        firstName: result.BillingContact.FirstName,
        lastName: result.BillingContact.LastName,
        address: result.BillingContact.Address,
        apt: result.BillingContact.Apt,
        city: result.BillingContact.City,
        state: result.BillingContact.State,
        zipCode: result.BillingContact.ZipCode,
        phoneNumber: result.BillingContact.PhoneNumber,
        email: result.BillingContact.Email,
      },
      shipping: {
        firstName: result.ShippingContact.FirstName,
        lastName: result.ShippingContact.LastName,
        address: result.ShippingContact.Address,
        apt: result.ShippingContact.Apt,
        city: result.ShippingContact.City,
        state: result.ShippingContact.State,
        zipCode: result.ShippingContact.ZipCode,
        phoneNumber: result.ShippingContact.PhoneNumber,
      },
      isSameContact: false,
      saveContactInformation: false,
    };
    setContact(contact);
  };

  const getContactInfo = () => {
    return { ...contact };
  };
  const toggleSameContact = () => {
    const contact = getContactInfo();
    contact.isSameContact = !contact.isSameContact;
    if (contact.isSameContact) contact.shipping = contact.billing;
    setContact(contact);
  };
  const updateBillingContact = (id, value) => {
    const contact = getContactInfo();
    const contactBilling = contact.billing;
    contactBilling[id] = value;
    if (contact.isSameContact) contact.shipping[id] = value;
    setContact(contact);
  };
  const updateShippingContact = (id, value) => {
    const contact = getContactInfo();
    const contactShipping = contact.shipping;
    contactShipping[id] = value;
    setContact(contact);
  };
  const toggleSaveContactInformation = () => {
    const contact = getContactInfo();
    contact.saveContactInformation = !contact.saveContactInformation;
    setContact(contact);
  };
  const value = {
    contact,
    toggleSameContact,
    updateBillingContact,
    updateShippingContact,
    toggleSaveContactInformation,
  };

  return <ContactInfoStateContext.Provider value={value} children={children} />;
};

export const useContactInfoState = () => {
  return useContext(ContactInfoStateContext);
};
