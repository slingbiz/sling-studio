import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Auth as awsAuth, Hub} from 'aws-amplify';
import {
  UPDATE_AUTH_USER,
  USER_LOADED,
} from '../../shared/constants/ActionTypes';
import {auth as firebaseAuth} from '../services/auth/firebase-config';
import {
  fetchStart,
  fetchSuccess,
  onGetLoggedInCognitoUser,
  setJWTToken,
} from '../../redux/actions';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import jwtAxios from '../services/auth/jwt-auth/jwt-api';
import {Cookies} from 'react-cookie';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      dispatch(fetchStart());
      const cookies = new Cookies();
      const token = cookies.get('token');
      if (!token) {
        dispatch(fetchSuccess());
        return;
      }
      dispatch(setJWTToken(token));
      try {
        const res = await jwtAxios.get('/auth');
        dispatch(fetchSuccess());
        setLoading(false);
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: {
            authType: AuthType.JWT_AUTH,
            displayName: res.data.name,
            email: res.data.email,
            role: defaultUser.role,
            token: res.data._id,
            photoURL: res.data.avatar,
          },
        });
        return;
      } catch (err) {
        dispatch(fetchSuccess());
        return;
      }
    };

    const checkAuth = () => {
      Promise.all([validateAuth()]).then(() => {
        if (loading) {
          setLoading(false);
          dispatch({
            type: USER_LOADED,
          });
        }
      });
    };
    checkAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = () => {
  const {user} = useSelector(({auth}) => auth);

  if (user) {
    return {id: 1, ...user};
  }
  return null;
};
