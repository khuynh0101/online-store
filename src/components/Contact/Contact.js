import React, { useState, useEffect } from 'react';
import styles from './contact.module.css';
import globalStyles from '../../app.module.css';
import { Input } from '../DataEntry/Input/Input';
import { TextArea } from '../DataEntry/TextArea/TextArea';

export const Contact = () => {
  const [state, setState] = useState({
    email: '',
    message: '',
    emailhasError: false,
    messageHasError: false,
    messageSent: false,
  });

  const [enableOrderButton, setEnableOrderButton] = useState(false);

  useEffect(() => {
    setEnableOrderButton(isFormValid());
  });
  const isFormValid = () => {
    let enableOrderButton = true;
    if (enableOrderButton && !checkEmail(state.email))
      enableOrderButton = false;

    if (enableOrderButton && state.message.length === 0)
      enableOrderButton = false;

    return enableOrderButton;
  };
  const handleEmailChanged = (e) => {
    const stateObj = { ...state };
    stateObj.email = e.target.value;
    setState(stateObj);
  };

  const handleMessageChanged = (e) => {
    const stateObj = { ...state };
    stateObj.message = e.target.value;
    setState(stateObj);
  };

  const handleEmailOnBlur = (e) => {
    const stateObj = { ...state };
    stateObj.emailhasError = !checkEmail(e.target.value);
    setState(stateObj);
  };
  const handleMessageBlur = (e) => {
    const stateObj = { ...state };
    stateObj.messageHasError = e.target.value.length === 0;
    setState(stateObj);
  };

  const checkEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  const handleSendMessageClick = () => {
    const stateObj = {
      email: '',
      message: '',
      emailhasError: false,
      messageHasError: false,
      messageSent: true,
    };
    setState(stateObj);
  };
  return (
    <section className={globalStyles.container}>
      <p className={globalStyles.textMedium}>Feel free to contact us</p>
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            type='email'
            name='Email:'
            hasFocus={true}
            isRequired={true}
            onChange={handleEmailChanged}
            onBlur={handleEmailOnBlur}
            value={state.email}
            hasError={state.emailhasError}
          />
        </div>
        <div className={styles.input}>
          <TextArea
            name='Message:'
            isRequired={true}
            onChange={handleMessageChanged}
            onBlur={handleMessageBlur}
            value={state.message}
            hasError={state.messageHasError}
          />
        </div>
        <div>
          <button
            disabled={!enableOrderButton}
            className={globalStyles.button}
            onClick={handleSendMessageClick}
          >
            Send Message
          </button>
        </div>
        {state.messageSent && (
          <div>
            <p className={globalStyles.textMedium}>
              Your message has been sent. We will reply back in 1-2 business
              days.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
