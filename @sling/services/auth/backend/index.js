import API from '../../ApiConfig.js';

const sendVerificationEmail = (token) => {
  return API.post(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/auth/send-verification-email`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};
const sendVerificationEmailByToken = (token) => {
  return API.get(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/auth/send-verification-email-bytoken`,
    {
      params: {token: token},
    },
  );
};

const verifyEmailAddress = (token) => {
  return API.get(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/auth/verify-email`,
    {
      params: {token: token},
    },
  );
};

const verifyEmailAddressServer = (token) => {
  return API.get(`${process.env.SERVICE_URL}v1/auth/verify-email`, {
    params: {token: token},
  });
};

const registerUser = (name, email, password) => {
  return API.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/auth/register`, {
    name: name,
    email: email,
    password: password,
  });
};

const loginUser = (email, password) => {
  return API.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/v1/auth/login`, {
    email: email,
    password: password,
  });
};

export {
  registerUser,
  sendVerificationEmail,
  loginUser,
  verifyEmailAddress,
  verifyEmailAddressServer,
  sendVerificationEmailByToken,
};
