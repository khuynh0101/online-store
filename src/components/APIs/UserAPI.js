export const saveContactInformation = async (
  encodedCredentials,
  contacts,
  callbackFunc
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_USER_PREFIX_URL}UpdateContacts`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify(contacts),
    }
  );
  const data = await response.json();
  callbackFunc(data);
};

export const getContactInformation = async (
  encodedCredentials,
  callbackFunc
) => {
  const url = `${process.env.REACT_APP_API_USER_PREFIX_URL}GetUserContactInformation`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Basic ${encodedCredentials}`,
    },
  });
  const data = await response.json();
  callbackFunc(data);
};
//export const placeOrder = (encodedCredentials, orders) => {};
