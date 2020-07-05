import React, { useState, useEffect } from 'react';
import { Input } from '../DataEntry/Input/Input';
import { checkEmailValid } from '../../utils/checkEmailValid';
import { useSecurity } from '../hooks/useSecurity';
import { Link, useHistory, useParams } from 'react-router-dom';
import { checkEnterKey } from '../../utils/checkEnterKey';
import styles from './resetlink.module.css';
import globalStyles from '../../app.module.css';

export const ResetLink = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    emailhasError: false,
  });
  const { resetLink } = useSecurity();
  const [message, setMessage] = useState('');

  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    setEnableButton(isFormValid());
  });
  const isFormValid = () => {
    let enableButton = true;
    if (enableButton && !checkEmailValid(state.email)) enableButton = false;
    return enableButton;
  };

  const handleEmailChanged = (e) => {
    const stateObj = { ...state };
    stateObj.email = e.target.value;
    setState(stateObj);
  };
  const handleEmailOnBlur = (e) => {
    const stateObj = { ...state };
    stateObj.emailhasError = !checkEmailValid(e.target.value);
    setState(stateObj);
  };
  const handleResetLinkClick = () => {
    if (isFormValid()) resetLink(state.email, updateMessage);
    else setEnableButton(false);
  };
  const updateMessage = ({ token }) => {
    console.log(token);
    setMessage('Email was sent with the link to reset.');
  };
  return (
    <section onKeyDown={(event) => checkEnterKey(event, handleResetLinkClick)}>
      <p className={globalStyles.textMedium}>
        Enter your email to reset your password.
      </p>
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            name='Email:'
            type='email'
            isRequired='true'
            value={state.email}
            onChange={handleEmailChanged}
            onBlur={handleEmailOnBlur}
            hasError={state.emailhasError}
          />
        </div>
        <button
          disabled={!enableButton}
          className={globalStyles.button}
          onClick={handleResetLinkClick}
        >
          Send Reset Link
        </button>
        <div>
          <p className={globalStyles.textMedium}>{message}</p>
        </div>
      </div>
    </section>
  );
};
