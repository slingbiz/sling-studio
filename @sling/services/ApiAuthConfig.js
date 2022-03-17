import axios from 'axios';
import {auth} from './auth/firebase-config';

const AxiosAuth = async () => {
  const user = auth.currentUser;
  const token = await user?.getIdToken();
  if (!token) {
    return;
  }
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + token,
    },
  });
};

export default AxiosAuth;
