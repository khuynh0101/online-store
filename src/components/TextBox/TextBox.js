import React from 'react';
import styles from './textBox.module.css';
import globalStyles from '../../app.module.css';

export const TextBox = ({
  name,
  isRequired = false,
  placeholder,
  textBoxStyles,
}) => {
  return (
    <>
      <span className={`${globalStyles.textSmall}`}>{name}</span>
      {isRequired && (
        <span className={`${globalStyles.textSmaller} ${styles.requiredText}`}>
          Required
        </span>
      )}
      <input
        type='text'
        placeholder={placeholder}
        className={`${globalStyles.input} ${textBoxStyles}`}
      />
    </>
  );
};
