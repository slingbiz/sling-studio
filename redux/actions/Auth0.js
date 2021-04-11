import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../shared/constants/ActionTypes';
import Auth0Config from '../../@crema/services/auth/auth0/auth0Config';
import {AuthType} from '../../shared/constants/AppEnums';
import {setJWTToken} from './JWTAuth';
import {defaultUser} from '../../shared/constants/AppConst';

export const onSignInAuth0User = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const auth0 = await Auth0Config();
      await auth0.loginWithPopup({});
      auth0
        .getUser()
        .then((user) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch(setJWTToken(user.sub));
          dispatch({
            type: UPDATE_AUTH_USER,
            payload: getUserObject(user),
          });
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

const getUserObject = (user) => {
  return {
    authType: AuthType.AUTH0,
    role: defaultUser.role,
    uid: user.sub,
    displayName: user.name,
    email: user.email,
    photoURL: user.picture,
    token: user.sub,
  };
};

export const onSignOutAuth0User = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const auth0 = await Auth0Config();
      auth0.logout();
      dispatch({type: UPDATE_AUTH_USER, payload: null});
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
