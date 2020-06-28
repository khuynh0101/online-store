import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './contactInfo.module.css';
import globalStyles from '../../app.module.css';
import { Input } from '../DataEntry/Input/Input';
import { DropDownList } from '../DataEntry/DropDownList/DropDownList';
import { ContactProps } from '../Providers/ContactInfoState';
import states from '../../data/states.json';

export const ContactInfo = ({
  heading,
  onTextChange,
  onStateChange,
  onZipCodeChange,
  onTelephoneChange,
  onBlur,
  contactInfo,
  hasFocus,
  errors,
}) => {
  const history = useHistory();
  return (
    <div className={styles.billing}>
      <p className={globalStyles.textMedium}>{heading}</p>
      <div>
        <div className={styles.inputContainer}>
          <Input
            name='First Name:'
            isRequired='true'
            value={contactInfo.firstName}
            textBoxStyles={styles.input}
            onChange={(e) => onTextChange(e, ContactProps.FIRST_NAME)}
            onBlur={(e) => onBlur(e, ContactProps.FIRST_NAME)}
            hasFocus={hasFocus}
            hasError={errors.firstName}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            name='Last Name:'
            isRequired='true'
            value={contactInfo.lastName}
            textBoxStyles={styles.input}
            onChange={(e) => onTextChange(e, ContactProps.LAST_NAME)}
            onBlur={(e) => onBlur(e, ContactProps.LAST_NAME)}
            hasError={errors.lastName}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            name='Address:'
            isRequired='true'
            value={contactInfo.address}
            textBoxStyles={styles.input}
            onChange={(e) => onTextChange(e, ContactProps.ADDRESS)}
            onBlur={(e) => onBlur(e, ContactProps.ADDRESS)}
            hasError={errors.address}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            name='Apartment/Suite/Other:'
            textBoxStyles={`${styles.input} ${styles.apt}`}
            value={contactInfo.apt}
            onChange={(e) => onTextChange(e, ContactProps.APT)}
          />
        </div>

        <div className={`${styles.inputContainer} ${styles.city}`}>
          <Input
            name='City:'
            isRequired='true'
            textBoxStyles={`${styles.input} ${styles.city}`}
            value={contactInfo.city}
            onChange={(e) => onTextChange(e, ContactProps.CITY)}
            onBlur={(e) => onBlur(e, ContactProps.CITY)}
            hasError={errors.city}
          />
        </div>

        <div className={`${styles.inputContainer} ${styles.location}`}>
          <DropDownList
            isRequired={true}
            name='State:'
            options={states}
            onChange={(e) => onStateChange(e, ContactProps.STATE)}
            onBlur={(e) => onBlur(e, ContactProps.STATE)}
            hasError={errors.state}
          />
          <div>
            <Input
              name='Zip Code:'
              isRequired='true'
              value={contactInfo.zipCode}
              textBoxStyles={`${styles.input} ${styles.inputZipcode}`}
              onChange={(e) => onZipCodeChange(e, ContactProps.ZIP_CODE)}
              onBlur={(e) => onBlur(e, ContactProps.ZIP_CODE)}
              hasError={errors.zipCode}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <Input
            name='Phone Number:'
            isRequired='true'
            value={contactInfo.phoneNumber}
            textBoxStyles={`${styles.input} ${styles.phoneNumber}`}
            onChange={(e) => onTelephoneChange(e, ContactProps.PHONE_NUMBER)}
            onBlur={(e) => onBlur(e, ContactProps.PHONE_NUMBER)}
            hasError={errors.phoneNumber}
          />
        </div>
      </div>
    </div>
  );
};
