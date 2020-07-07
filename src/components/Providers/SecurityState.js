import React, { useContext, useState } from 'react';

const SecurityStateContext = React.createContext();

export const SecurityStateProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return document.cookie.indexOf('u=') > -1;
  });

  const getEncodedData = () => {
    let encodedData = '';
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      if (cookie.indexOf('u=') > -1) {
        encodedData = cookie.substr(cookie.indexOf('u=') + 2);
      }
    });
    return encodedData;
  };

  const register = async (email, password, callBackFunc) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_USER_PREFIX_URL}Register`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName: email,
            Password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.content === 'Registered') {
        setLoggedIn(true);

        const userLogIn = `${email}:${password}`;
        const encodedData = window.btoa(userLogIn);
        document.cookie = `u=${encodedData};path=/`;

        callBackFunc({
          status: data.content,
          message: 'Registered successfully',
        });
      } else if (data.content === 'Exists') {
        callBackFunc({
          status: data.content,
          message:
            'Registered failed. It looks like the email address is already used.',
        });
      }
    } catch {
      callBackFunc({
        status: 'Error',
        message: 'Error occurred. Please try again.',
      });
    }
  };

  const signIn = async (email, password, callBackFunc) => {
    try {
      const userLogIn = `${email}:${password}`;
      const encodedData = window.btoa(userLogIn);

      const response = await fetch(
        `${process.env.REACT_APP_API_USER_PREFIX_URL}SignIn`,
        {
          method: 'POST',
          headers: {
            authorization: `Basic ${encodedData}`,
          },
        }
      );

      const data = await response.json();
      if (data.content) {
        setLoggedIn(true);
        document.cookie = `u=${encodedData};path=/`;
        callBackFunc({ status: true, message: 'Signed in successfully' });
      } else {
        callBackFunc({ status: false, message: 'Invalid email/password.' });
      }
    } catch {
      callBackFunc({
        status: false,
        message: 'Error occurred. Please try again.',
      });
    }
  };

  const resetLink = async (email, callBackFunc) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_USER_PREFIX_URL}SendResetLink`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName: email,
            Password: '',
          }),
        }
      );
      const data = await response.json();
      console.log(data.content);
      callBackFunc({
        token: data.content,
      });
    } catch {
      callBackFunc({
        status: 'Error',
        message: 'Error occurred. Please try again.',
      });
    }
  };

  const reset = async (email, password, callBackFunc) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_USER_PREFIX_URL}Reset`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserName: email,
            Password: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data.content);
      callBackFunc({
        status: data.content,
      });
    } catch {
      callBackFunc({
        status: 'Error',
        message: 'Error occurred. Please try again.',
      });
    }
  };

  const signOut = () => {
    document.cookie = `u='';path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    setLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    register,
    signIn,
    resetLink,
    reset,
    signOut,
    getEncodedData,
  };

  return <SecurityStateContext.Provider value={value} children={children} />;
};

export const useSecurityState = () => {
  return useContext(SecurityStateContext);
};
