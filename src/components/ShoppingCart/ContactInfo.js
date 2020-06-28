import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './contactInfo.module.css';
import globalStyles from '../../app.module.css';
import { TextBox } from '../TextBox/TextBox';
import { ContactProps } from '../Providers/ContactInfoState';

export const ContactInfo = ({
  heading,
  onTextChange,
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
          <TextBox
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
          <TextBox
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
          <TextBox
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
          <TextBox
            name='Apartment/Suite/Other:'
            textBoxStyles={`${styles.input} ${styles.apt}`}
            value={contactInfo.apt}
            onChange={(e) => onTextChange(e, ContactProps.APT)}
          />
        </div>

        <div className={`${styles.inputContainer} ${styles.city}`}>
          <TextBox
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
          <div className={styles.state}>
            <div className={globalStyles.textSmall}>State:</div>
            <select className={styles.inputState}>
              <option value='AL'>Alabama</option>
              <option value='AK'>Alaska</option>
              <option value='AZ'>Arizona</option>
              <option value='AR'>Arkansas</option>
              <option value='CA'>California</option>
              <option value='CO'>Colorado</option>
              <option value='CT'>Connecticut</option>
              <option value='DE'>Delaware</option>
              <option value='DC'>District Of Columbia</option>
              <option value='FL'>Florida</option>
              <option value='GA'>Georgia</option>
              <option value='HI'>Hawaii</option>
              <option value='ID'>Idaho</option>
              <option value='IL'>Illinois</option>
              <option value='IN'>Indiana</option>
              <option value='IA'>Iowa</option>
              <option value='KS'>Kansas</option>
              <option value='KY'>Kentucky</option>
              <option value='LA'>Louisiana</option>
              <option value='ME'>Maine</option>
              <option value='MD'>Maryland</option>
              <option value='MA'>Massachusetts</option>
              <option value='MI'>Michigan</option>
              <option value='MN'>Minnesota</option>
              <option value='MS'>Mississippi</option>
              <option value='MO'>Missouri</option>
              <option value='MT'>Montana</option>
              <option value='NE'>Nebraska</option>
              <option value='NV'>Nevada</option>
              <option value='NH'>New Hampshire</option>
              <option value='NJ'>New Jersey</option>
              <option value='NM'>New Mexico</option>
              <option value='NY'>New York</option>
              <option value='NC'>North Carolina</option>
              <option value='ND'>North Dakota</option>
              <option value='OH'>Ohio</option>
              <option value='OK'>Oklahoma</option>
              <option value='OR'>Oregon</option>
              <option value='PA'>Pennsylvania</option>
              <option value='RI'>Rhode Island</option>
              <option value='SC'>South Carolina</option>
              <option value='SD'>South Dakota</option>
              <option value='TN'>Tennessee</option>
              <option value='TX'>Texas</option>
              <option value='UT'>Utah</option>
              <option value='VT'>Vermont</option>
              <option value='VA'>Virginia</option>
              <option value='WA'>Washington</option>
              <option value='WV'>West Virginia</option>
              <option value='WI'>Wisconsin</option>
              <option value='WY'>Wyoming</option>
            </select>
          </div>
          <div>
            <TextBox
              type='zip'
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
          <TextBox
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
