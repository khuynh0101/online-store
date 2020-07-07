import React from 'react';
import styles from './input.module.css';
import globalStyles from '../../../app.module.css';

export const Input = ({
  type = 'text',
  name,
  isRequired = false,
  value,
  placeholder,
  textBoxStyles,
  onChange,
  onBlur,
  hasFocus,
  hasError,
}) => {
  const handleOnChange = (e) => {
    if (type === 'zip') {
      let value = e.target.value.replace(/[^0-9]/gi, '');
      if (value.length > 5) value = value.substring(0, 5);
      e.target.value = value;
      onChange(e);
    } else if (type === 'phoneNumber') {
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
        e.target.value = newValue;
        onChange(e);
      }
    } else if (type === 'email') {
      const value = e.target.value.replace(/[^0-9A-Za-z@.]/gi, '');
      e.target.value = value;
      onChange(e);
    } else if (type === 'password') {
      const value = e.target.value.replace(/ /gi, '');
      e.target.value = value;
      onChange(e);
    } else {
      const value = e.target.value.replace(/[^0-9A-Za-z\s.'#-]/gi, '');
      e.target.value = value;
      onChange(e);
    }
  };
  const renderInput = () => {
    if (type === 'checkbox') {
      console.log(value);
      return (
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            className={styles.checkbox}
            checked={value}
            onChange={onChange}
          />
          <span className={globalStyles.textSmall}>{name}</span>
        </label>
      );
    } else
      return (
        <>
          <div>
            <span className={`${globalStyles.textSmall}`}>{name}</span>
            {isRequired && (
              <span
                className={`${globalStyles.textSmaller} ${styles.requiredText}`}
              >
                Required
              </span>
            )}
          </div>
          <div className={styles.textboxErrorContainer}>
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              className={`${globalStyles.input} ${textBoxStyles}`}
              onChange={handleOnChange}
              autoFocus={hasFocus ? true : null}
              onBlur={onBlur}
            />
            {hasError && isRequired && (
              <svg
                className={styles.errorImg}
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 0 24 24'
                width='24'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' />
              </svg>
            )}
          </div>
        </>
      );
    // } else return null;
  };
  return renderInput();
};
