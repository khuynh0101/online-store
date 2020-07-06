import React, { useState, useEffect } from 'react';
import { Input } from '../DataEntry/Input/Input';
import { checkEmailValid } from '../../utils/checkEmailValid';
import { useSecurityState } from '../Providers/SecurityState';
import { checkEnterKey } from '../../utils/checkEnterKey';
import { ResetLink } from './ResetLink';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './reset.module.css';
import globalStyles from '../../app.module.css';

export const Reset = () => {
  const history = useHistory();
  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
    passwordHasError: false,
    confirmPasswordHasError: false,
    messageSent: false,
  });
  const { reset } = useSecurityState();
  const [status, setStatus] = useState('');

  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    setEnableButton(isFormValid());
  });

  const { token } = useParams();
  const hasToken = token ? true : false;
  const isFormValid = () => {
    let enableButton = true;
    if (enableButton && state.password.length === 0) enableButton = false;
    if (
      (enableButton && state.confirmPassword.length === 0) ||
      state.confirmPassword !== state.password
    )
      enableButton = false;

    return enableButton;
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
  const handleResetClick = () => {
    if (isFormValid()) reset(token, state.password, updateStatus);
    else setEnableButton(false);
  };

  const updateStatus = ({ status }) => {
    setStatus(status);
    // if (status === 'Reset')
    //   setMessage(
    //     'Your password is reset. Please log in with your email address and password.'
    //   );
    // else {
    //   const link = <Link to='/reset'>here</Link>;
    //   setMessage(
    //     'Something went wrong. Please try to generate a new link link' + link
    //   );
    // }
  };

  return (
    <section
      className={globalStyles.container}
      onKeyDown={(event) => checkEnterKey(event, handleResetClick)}
    >
      <p className={globalStyles.textLarge}>Reset Password</p>
      {!hasToken && <ResetLink />}
      {hasToken && (
        <>
          <p className={globalStyles.textMedium}>
            Please enter your new password.
          </p>
        </>
      )}
      <div className={styles.container}>
        {hasToken && (
          <>
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
            <button
              disabled={!enableButton}
              className={globalStyles.button}
              onClick={handleResetClick}
            >
              Reset Password
            </button>
          </>
        )}
        <div>
          <p className={globalStyles.textMedium}>
            {status === 'Reset' && (
              <>
                Your password is reset. Please log in with your email address
                and password.
              </>
            )}
            {status === 'Invalid Token' && (
              <>
                Looks like you have an invalid link. Please click{' '}
                <Link className={globalStyles.link} to='/reset'>
                  here
                </Link>{' '}
                to generate a new one.
              </>
            )}
            {status === 'Failed' && (
              <>
                Looks like you have an invalid link. Please click{' '}
                <Link className={globalStyles.link} to='/reset'>
                  here
                </Link>{' '}
                to generate a new one.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};
