import ApiAuth from '../../@sling/services/ApiAuthConfig';
import axios from 'axios';
import {setCookie} from 'nookies'; // Import nookies for cookie handling

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

        //Set auth in cookie
        setAuthCookie(tokens.access.token);

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
      //Get error msg from server
      const errMsg = error?.response?.data?.message || error.message;
      dispatch({type: FETCH_ERROR, payload: errMsg});
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

        //Set auth in cookie
        setAuthCookie(tokens.access.token);

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
      //Get error msg from server
      const errMsg = error?.response?.data?.message || error.message;
      dispatch({type: FETCH_ERROR, payload: errMsg});
    }
    try {
      tick(email);
    } catch (error) {}
  };
};

const setAuthCookie = (token) => {
  // Set a cookie to indicate the user is logged in
  setCookie(null, 'loginToken', token, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    domain: '.sling.biz', // Ensure the cookie is accessible on all subdomains
    sameSite: 'None', // Allow cross-domain access
    secure: true, // Ensure cookies are only sent over HTTPS
  });
};
const tick = (email) => {
  axios
    .post('https://api.sling.biz/v1/auth/tick', {
      email,
    })
    .catch((error) => {});
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
    const refreshToken = localStorage.getItem('refreshToken');
    Api.post(`${SERVICE_URL}v1/auth/logout`, {refreshToken})
      .then((response) => {
        dispatch({type: FETCH_SUCCESS});
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });

    //Clear all the cookies
    setCookie(null, 'loginToken', '', {
      maxAge: 0, // 1 week 0
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


// Forget Password
export const onJwtAuthForgetPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_START });
    try {
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
        return;
      }
      const response = await Api.post(`${SERVICE_URL}v1/auth/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        dispatch({ type: FETCH_SUCCESS });
        // You can dispatch other actions or show a success message as needed
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      // Get error msg from server
      const errMsg = error?.response?.data?.message || error.message;
      dispatch({ type: FETCH_ERROR, payload: errMsg });
    }
  };
};
