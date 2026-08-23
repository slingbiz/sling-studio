import axios from 'axios';
import {SERVICE_URL} from '../../shared/constants/Services';

let refreshPromise = null;
let hasRedirectedToSignin = false;

const persistTokens = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('token', accessToken);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

const clearSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

const redirectToSigninOnce = () => {
  if (hasRedirectedToSignin) {
    return;
  }
  hasRedirectedToSignin = true;
  window.location.replace('/signin');
};

const isRefreshUrl = (url = '') => String(url).includes('/auth/refresh-tokens');

const AxiosAuth = () => {
  const axiosInst = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: '*',
    },
  });

  axiosInst.interceptors.request.use(
    (config) => {
      if (isRefreshUrl(config.url)) {
        if (config.headers) {
          delete config.headers.Authorization;
        }
        return config;
      }
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInst.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config || {};
      if (isRefreshUrl(originalRequest.url)) {
        return Promise.reject(error);
      }
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInst(originalRequest);
          }
        } catch (refreshError) {
          const expired = refreshError || error;
          expired.__sessionExpired = true;
          return Promise.reject(expired);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInst;
};

export default AxiosAuth;

export const getCurrentToken = () => {
  return localStorage.getItem('accessToken');
};

export const refreshAccessToken = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post(
        `${SERVICE_URL}v1/auth/refresh-tokens`,
        {refreshToken},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const accessToken = response.data?.access?.token;
      const nextRefreshToken = response.data?.refresh?.token;
      if (!accessToken) {
        throw new Error('Missing access token');
      }
      persistTokens(accessToken, nextRefreshToken);
      return accessToken;
    } catch (error) {
      error.__sessionExpired = true;
      clearSession();
      redirectToSigninOnce();
      throw error;
    }
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};
