import React, { useState, useEffect } from 'react';
import { Input } from '../DataEntry/Input/Input';
import { checkEmailValid } from '../../utils/checkEmailValid';
import { useSecurity } from '../hooks/useSecurity';
import { Link, useHistory } from 'react-router-dom';
import { checkEnterKey } from '../../utils/checkEnterKey';
import styles from './register.module.css';
import globalStyles from '../../app.module.css';

export const Register = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    emailhasError: false,
    passwordHasError: false,
    confirmPasswordHasError: false,
    messageSent: false,
  });
  const { isLoggedIn, register } = useSecurity();
  const [registerStatus, setRegisterStatus] = useState('');

  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    setEnableButton(isFormValid());
  });

  const isFormValid = () => {
    let enableButton = true;
    if (enableButton && !checkEmailValid(state.email)) enableButton = false;

    if (enableButton && state.password.length === 0) enableButton = false;

    if (
      (enableButton && state.confirmPassword.length === 0) ||
      state.confirmPassword !== state.password
    )
      enableButton = false;

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

  const handleConfirmPasswordChanged = (e) => {
    const stateObj = { ...state };
    stateObj.confirmPassword = e.target.value;
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
  const handleConfirmPasswordOnBlur = (e) => {
    const stateObj = { ...state };
    stateObj.confirmPasswordHasError =
      e.target.value.length === 0 || e.target.value != stateObj.password;
    setState(stateObj);
  };
  const handleRegisterClick = () => {
    if (isFormValid()) register(state.email, state.password, updateStatus);
    else setEnableButton(false);
  };

  const updateStatus = ({ status, message }) => {
    setRegisterStatus(status);
  };

  return (
    <section
      className={globalStyles.container}
      onKeyDown={(event) => checkEnterKey(event, handleRegisterClick)}
    >
      <p className={globalStyles.textLarge}>Register</p>

      <div className={styles.container}>
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
            <div className={styles.input}>
              <Input
                name='Confirm Password:'
                type='password'
                isRequired='true'
                value={state.confirmPassword}
                onChange={handleConfirmPasswordChanged}
                onBlur={handleConfirmPasswordOnBlur}
                hasError={state.confirmPasswordHasError}
              />
            </div>
            <div>
              <button
                disabled={!enableButton}
                className={globalStyles.button}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>
            <div>
              <p className={globalStyles.textMedium}>
                {registerStatus === 'Registered' && (
                  <>
                    Thank you for registering. Please click{' '}
                    <Link className={globalStyles.link} to='/plants'>
                      here
                    </Link>{' '}
                    to starting shopping.
                  </>
                )}
                {registerStatus === 'Exists' && (
                  <>
                    Looks like the email is already registered. If you forgot
                    your password, please click
                    <Link className={globalStyles.link} to='/reset'>
                      here
                    </Link>{' '}
                    to reset.
                  </>
                )}
                {registerStatus === 'Error' && (
                  <>
                    Looks like something didn't go according to plan. Please try
                    registering at a later time.
                  </>
                )}
              </p>
            </div>
          </>
        )}
        {isLoggedIn && (
          <p className={globalStyles.textMedium}>
            You are already registered. Please click{' '}
            <Link className={globalStyles.link} to='/plants'>
              here
            </Link>{' '}
            to starting shopping.
          </p>
        )}
      </div>
    </section>
  );
};
