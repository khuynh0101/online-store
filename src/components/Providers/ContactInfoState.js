import React, { useContext, useState } from 'react';

export const ContactProps = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ADDRESS: 'address',
  APT: 'apt',
  CITY: 'city',
  STATE: 'state',
  ZIP_CODE: 'zipCode',
  PHONE_NUMBER: 'phoneNumber',
};

const ContactInfoStateContext = React.createContext();
export const ContactInfoStateProvider = ({ children }) => {
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
  });

  const getContactInfo = () => {
    return { ...contact };
  };
  const toggleSameContact = () => {
    const contact = getContactInfo();
    contact.isSameContact = !contact.isSameContact;
    setContact(contact);
  };
  const updateBillingContact = (id, value) => {
    const contact = getContactInfo();
    const contactBilling = getContactInfo().billing;
    contactBilling[id] = value.trim();
    setContact(contact);
  };
  const updateShippingContact = (id, value) => {
    const contact = getContactInfo();
    const contactShipping = getContactInfo().shipping;
    contactShipping[id] = value.trim();
    setContact(contact);
  };
  const value = {
    getContactInfo,
    toggleSameContact,
    updateBillingContact,
    updateShippingContact,
  };

  return <ContactInfoStateContext.Provider value={value} children={children} />;
};

export const useContactInfoState = () => {
  return useContext(ContactInfoStateContext);
};
