import React, { useState, useEffect } from 'react';
import { Input } from '../DataEntry/Input/Input';
import { checkEmailValid } from '../../utils/checkEmailValid';
import { useHistory } from 'react-router-dom';
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

  const [message, setMessage] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(document.cookie.indexOf('u=') > -1);
  });
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
    const data = `${state.email}:${state.password}`;
    const encodedData = window.btoa(data);
    // document.cookie = `u=${encodedData};path=/`;
    //call service to confirm the
    signIn(encodedData);
    // document.cookie = `u=${encodedData};path=/`;
    // } else {
    //   setMessage('Invalid email/password.');
    // }
    //show option to add email address
    //history.push('/');
  };
  const handleSignOutClick = () => {
    document.cookie = `u='';path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    setLoggedIn(false);
  };

  const signIn = async (user) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_USER_PREFIX_URL}SignIn`,
        {
          method: 'POST',
          headers: {
            authorization: `Basic ${user}`,
          },
        }
      );
      const data = await response.json();
      if (data.content) {
        setLoggedIn(true);
        document.cookie = `u=${user};path=/`;
      } else {
        setMessage('Invalid email/password.');
      }
    } catch {
      setMessage('Error occurred. Please try again.');
    }
  };
  return (
    <section className={globalStyles.container}>
      <p className={globalStyles.textLarge}>Sign In</p>

      <div className={styles.container}>
        {loggedIn && (
          <>
            <p className={globalStyles.textMedium}>
              You are already signed in. Click the button below to sign out.
              <button
                className={globalStyles.button}
                onClick={handleSignOutClick}
              >
                Sign Out
              </button>
            </p>
          </>
        )}
        {!loggedIn && (
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
            <div>
              <button
                disabled={!enableButton}
                className={globalStyles.button}
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>

            <div>
              <p className={globalStyles.textMedium}>{message}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
