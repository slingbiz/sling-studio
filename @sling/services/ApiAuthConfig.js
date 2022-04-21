import axios from 'axios';
import {auth} from './auth/firebase-config';

const ApiAuth = async () => {
  const user = auth.currentUser;
  const token = await user?.getIdToken();
  if (!token) {
    return;
  }
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*',
      Authorization: 'Bearer ' + token,
    },
  });
};

export default ApiAuth;
