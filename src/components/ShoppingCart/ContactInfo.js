import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './contactInfo.module.css';
import globalStyles from '../../app.module.css';
import { TextBox } from '../TextBox/TextBox';

export const ContactInfo = ({ heading }) => {
  const history = useHistory();
  return (
    <div className={styles.billing}>
      <p className={globalStyles.textMedium}>{heading}</p>
      <div>
        <div className={styles.inputContainer}>
          <TextBox
            name='First Name:'
            isRequired='true'
            textBoxStyles={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextBox
            name='Last Name:'
            isRequired='true'
            textBoxStyles={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextBox
            name='Address:'
            isRequired='true'
            textBoxStyles={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextBox
            name='Apartment/Suite/Other:'
            textBoxStyles={`${styles.input} ${styles.apt}`}
          />
        </div>
        <div className={`${styles.inputContainer} ${styles.location}`}>
          <div className={styles.city}>
            <TextBox
              name='City:'
              isRequired='true'
              textBoxStyles={`${styles.input} ${styles.city}`}
            />
          </div>
          <div className={styles.stateZipFlex}>
            <div className={styles.state}>
              <TextBox
                name='State:'
                isRequired='true'
                textBoxStyles={`${styles.input} ${styles.inputState}`}
              />
            </div>
            <div>
              <TextBox
                name='Zip Code:'
                isRequired='true'
                textBoxStyles={`${styles.input} ${styles.inputZipcode}`}
              />
            </div>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <TextBox
            name='Phone Number:'
            isRequired='true'
            textBoxStyles={`${styles.input} ${styles.phoneNumber}`}
          />
        </div>
      </div>
    </div>
  );
};
