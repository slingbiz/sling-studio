import axios from 'axios';
import { Cookies } from 'react-cookie';

const jwtAxios = axios.create({
  baseURL: 'https://crema-mongo-api.herokuapp.com/api/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  const cookies = new Cookies();
  if (token) {
    jwtAxios.defaults.headers.common['x-auth-token'] = token;
    cookies.set('token', token, { path: "/" });
  } else {
    delete jwtAxios.defaults.headers.common['x-auth-token'];
    cookies.remove('token');
  }
};

export default jwtAxios;
