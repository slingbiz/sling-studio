import ApiAuth from '../../ApiAuthConfig.js';
import {SERVICE_URL} from '../../../../shared/constants/Services';

const sendVerificationEmail = async (token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(
    `${SERVICE_URL}v1/auth/send-verification-email`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};
const sendVerificationEmailByToken = async (token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.get(`${SERVICE_URL}v1/auth/send-verification-email-bytoken`, {
    params: {token: token},
  });
};

const verifyEmailAddress = async (token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.get(`${SERVICE_URL}v1/auth/verify-email`, {
    params: {token: token},
  });
};

const verifyEmailAddressServer = async (token) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.get(`${process.env.SERVICE_URL}v1/auth/verify-email`, {
    params: {token: token},
  });
};

const registerUser = async (name, email, password, id) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/auth/register`, {
    name: name,
    email: email,
    password: password,
    _id: id,
  });
};

const loginUser = async (email, password) => {
  const Api = await ApiAuth();
  if (!Api) {
    return;
  }
  return Api.post(`${SERVICE_URL}v1/auth/login`, {
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
