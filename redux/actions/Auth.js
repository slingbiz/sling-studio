import ApiAuth from '../../@sling/services/ApiAuthConfig';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SET_AUTH_TOKEN,
  UPDATE_NEW_SIGNUP,
  UPDATE_AUTH_USER,
  SIGNOUT_AUTH_SUCCESS,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@sling/utility/IntlMessages';
import React from 'react';
import {SERVICE_URL} from '../../shared/constants/Services';
import {initialUrl} from '../../shared/constants/AppConst';

export const onJwtSignIn = ({email, password}, router) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const response = await Api.post(`${SERVICE_URL}v1/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Save the token in local storage
        localStorage.setItem('token', response.data.token);
        // Check for the correct status code
        const {user, tokens} = response.data;

        // Save the tokens in local storage
        localStorage.setItem('accessToken', tokens.access.token);
        localStorage.setItem('refreshToken', tokens.refresh.token);
        // localStorage.setItem('newUser', 'true');

        //TODO Use flag isCompanySetup from the backend to use newUser and take user to company-setup page

        // Dispatch SET_AUTH_TOKEN action
        dispatch({
          type: SET_AUTH_TOKEN,
          payload: response.data.token,
        });

        // Dispatch UPDATE_AUTH_USER action with user data
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: user,
        });

        dispatch({type: FETCH_SUCCESS});

        // Redirect to the dashboard or another page
        router.push(initialUrl);
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onJwtUserSignUp = ({name, email, password}, router) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const response = await Api.post(`${SERVICE_URL}v1/auth/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // Check for the correct status code
        const {user, tokens} = response.data;

        // Save the tokens in local storage
        localStorage.setItem('accessToken', tokens.access.token);
        localStorage.setItem('refreshToken', tokens.refresh.token);
        localStorage.setItem('newUser', 'true');
        //TODO Use flag isCompanySetup from the backend to use newUser and take user to company-setup page

        // Dispatch SET_AUTH_TOKEN action with the access token
        dispatch({
          type: SET_AUTH_TOKEN,
          payload: tokens.access.token,
        });

        // Dispatch UPDATE_AUTH_USER action with user data
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: user,
        });

        // Dispatch UPDATE_NEW_SIGNUP action
        dispatch({
          type: UPDATE_NEW_SIGNUP,
          payload: user,
        });

        dispatch({type: FETCH_SUCCESS});

        // Redirect to the dashboard or another page
        router.push(`/account-setup`);
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onJwtAuthSignout = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
    }
    // Optionally, make an API call to the backend to log out
    Api.post(`${SERVICE_URL}v1/auth/logout`, {})
      .then((response) => {
        dispatch({type: FETCH_SUCCESS});
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });

    // Clear tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('newUser');

    // Dispatch the sign-out action
    dispatch({type: SIGNOUT_AUTH_SUCCESS});

    dispatch({type: FETCH_SUCCESS});

    // Redirect to login page
    window.location.href = '/signin';
  };
};
