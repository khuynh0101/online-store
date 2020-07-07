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
    setContact(contact);
  };
  const updateBillingContact = (id, value) => {
    const contact = getContactInfo();
    const contactBilling = getContactInfo().billing;
    contactBilling[id] = value;
    setContact(contact);
  };
  const updateShippingContact = (id, value) => {
    const contact = getContactInfo();
    const contactShipping = getContactInfo().shipping;
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
