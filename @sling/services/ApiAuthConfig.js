import axios from 'axios';
import {SERVICE_URL} from '../../shared/constants/Services';

const AxiosAuth = () => {
  const token = localStorage.getItem('accessToken');

  const axiosInst = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Request interceptor to add the token to headers
  axiosInst.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor to handle token expiration and retry
  axiosInst.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshAccessToken(); // Method to refresh the token
          if (newToken) {
            localStorage.setItem('accessToken', newToken);
            axios.defaults.headers.common['Authorization'] =
              `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInst(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh error:', refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInst;
};

export default AxiosAuth;

//
export const getCurrentToken = () => {
  return localStorage.getItem('accessToken');
};

export const refreshAccessToken = async () => {
  // Retrieve the refresh token from local storage
  const refreshToken = localStorage.getItem('refreshToken');
  const currentAccessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(
      `${SERVICE_URL}v1/auth/refresh-tokens`,
      {refreshToken},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: currentAccessToken
            ? `Bearer ${currentAccessToken}`
            : '',
        },
      },
    );
    const {accessToken} = response.data;
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle token refresh error by clearing the tokens and logging the user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/signin'; // Redirect to login page
    throw error;
  }
};
