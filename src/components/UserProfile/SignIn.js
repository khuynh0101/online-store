import React, { useState, useEffect } from 'react';
import { Input } from '../DataEntry/Input/Input';
import { checkEmailValid } from '../../utils/checkEmailValid';
import { useSecurity } from '../hooks/useSecurity';
import { Link, useHistory } from 'react-router-dom';
import { checkEnterKey } from '../../utils/checkEnterKey';
import styles from './signin.module.css';
import globalStyles from '../../app.module.css';

export const SignIn = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
    emailhasError: false,
    passwordHasError: false,
    messageSent: false,
  });
  const { isLoggedIn, signIn, signOut } = useSecurity();
  const [message, setMessage] = useState('');

  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    setEnableButton(isFormValid());
  });

  const isFormValid = () => {
    let enableButton = true;
    if (enableButton && !checkEmailValid(state.email)) enableButton = false;

    if (enableButton && state.password.length === 0) enableButton = false;

    return enableButton;
  };

  const handleEmailChanged = (e) => {
    const stateObj = { ...state };
    stateObj.email = e.target.value;
    setState(stateObj);
  };

  const handlePasswordChanged = (e) => {
    const stateObj = { ...state };
    stateObj.password = e.target.value;
    setState(stateObj);
  };

  const handleEmailOnBlur = (e) => {
    const stateObj = { ...state };
    stateObj.emailhasError = !checkEmailValid(e.target.value);
    setState(stateObj);
  };
  const handlePasswordOnBlur = (e) => {
    const stateObj = { ...state };
    stateObj.passwordHasError = e.target.value.length === 0;
    setState(stateObj);
  };
  const handleSignInClick = () => {
    if (isFormValid()) signIn(state.email, state.password, updateMessage);
    else setEnableButton(false);
  };
  const handleSignOutClick = () => {
    const user = { ...state };
    user.email = '';
    user.password = '';
    setState(user);
    signOut();
  };

  const updateMessage = ({ status, message }) => {
    if (!status) setMessage(message);
  };
  return (
    <section
      className={globalStyles.container}
      onKeyDown={(event) => checkEnterKey(event, handleSignInClick)}
    >
      <p className={globalStyles.textLarge}>Sign In</p>

      <div className={styles.container}>
        {isLoggedIn && (
          <>
            <p className={globalStyles.textMedium}>
              You are already signed in. Click the button below to sign out.
            </p>
            <button
              className={globalStyles.button}
              onClick={handleSignOutClick}
            >
              Sign Out
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
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
            <div className={styles.input}>
              <Input
                name='Password:'
                type='password'
                isRequired='true'
                value={state.password}
                onChange={handlePasswordChanged}
                onBlur={handlePasswordOnBlur}
                hasError={state.passwordHasError}
              />
            </div>
            <button
              disabled={!enableButton}
              className={globalStyles.button}
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <div
              className={`${globalStyles.textSmaller} ${styles.forgotPassword}`}
            >
              <Link className={globalStyles.link} to='/reset'>
                Forgot Password?
              </Link>
            </div>
            <div>
              <p className={globalStyles.textMedium}>{message}</p>
            </div>
            <p>
              <span className={globalStyles.textSmall}>
                Don't have an account.{' '}
                <Link className={globalStyles.link} to='/register'>
                  Register{' '}
                </Link>
                here
              </span>
            </p>
          </>
        )}
      </div>
    </section>
  );
};
