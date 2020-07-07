export const saveContactInformation = async (
  encodedCredentials,
  contact,
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
      body: JSON.stringify({
        BillingContact: {
          FirstName: contact.billing.firstName,
          LastName: contact.billing.lastName,
          Address: contact.billing.address,
          Apt: contact.billing.apt,
          City: contact.billing.city,
          State: contact.billing.state,
          ZipCode: contact.billing.zipCode,
          PhoneNumber: contact.billing.phoneNumber,
        },
        ShippingContact: {
          FirstName: contact.shipping.firstName,
          LastName: contact.shipping.lastName,
          Address: contact.shipping.address,
          Apt: contact.shipping.apt,
          City: contact.shipping.city,
          State: contact.shipping.state,
          ZipCode: contact.shipping.zipCode,
          PhoneNumber: contact.shipping.phoneNumber,
        },
      }),
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
  console.log(data);
  callbackFunc(data);
};

export const placeOrder = async (email, orders, contact, callbackFunc) => {
  let OrderDetails = [];

  orders.forEach((order) => {
    OrderDetails.push({
      ItemId: order.id,
      ItemAmount: order.numItem,
      ItemTotal: order.price,
    });
  });
  let body = JSON.stringify({
    Email: email,
    OrderDetails,
    BillingContact: {
      FirstName: contact.billing.firstName,
      LastName: contact.billing.lastName,
      Address: contact.billing.address,
      Apt: contact.billing.apt,
      City: contact.billing.city,
      State: contact.billing.state,
      ZipCode: contact.billing.zipCode,
      PhoneNumber: contact.billing.phoneNumber,
      Email: contact.billing.email,
    },
    ShippingContact: {
      FirstName: contact.shipping.firstName,
      LastName: contact.shipping.lastName,
      Address: contact.shipping.address,
      Apt: contact.shipping.apt,
      City: contact.shipping.city,
      State: contact.shipping.state,
      ZipCode: contact.shipping.zipCode,
      PhoneNumber: contact.shipping.phoneNumber,
    },
  });
  const response = await fetch(
    `${process.env.REACT_APP_API_STORE_PREFIX_URL}SaveOrder`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    }
  );
  const data = await response.json();
  callbackFunc(data);
};
