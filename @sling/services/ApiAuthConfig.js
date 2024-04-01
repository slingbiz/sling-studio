import axios from 'axios';
import {auth} from './auth/firebase-config';

const AxiosAuth = async () => {
  const user = auth.currentUser;
  const token = await user?.getIdToken();
  if (!token) {
    return;
  }
  const axiosInst = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*',
      Authorization: 'Bearer ' + token,
    },
  });

  // Add a response interceptor
  axiosInst.interceptors.response.use(
    (response) => {
      // If the request succeeds, return the response
      return response;
    },
    (error) => {
      // If there's an error in the request or response, handle it here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('API AUTH CONFIG | Response error:', error.response.data);
        console.log('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('API AUTH CONFIG | Request error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('API AUTH CONFIG | Error:', error.message);
      }
      return Promise.reject(error); // Reject the promise with the caught error
    },
  );

  return axiosInst;
};

export default AxiosAuth;
