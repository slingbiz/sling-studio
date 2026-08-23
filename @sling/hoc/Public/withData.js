import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { companyRegistrationUrl, initialUrl } from '../../../shared/constants/AppConst';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../core/Loader';
import {
  USER_LOADED,
  UPDATE_AUTH_USER,
  SET_AUTH_TOKEN,
} from '../../../shared/constants/ActionTypes';

const withData = (ComposedComponent) => (props) => {
  const { user, loading, newUser } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const { asPath, pathname } = useRouter();
  const queryParams = asPath.split('?')[1];

  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const usableToken = (value) =>
      value && value !== 'undefined' && value !== 'null';
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedToken =
      (usableToken(storedAccessToken) && storedAccessToken) ||
      (usableToken(localStorage.getItem('token')) &&
        localStorage.getItem('token'));

    if (storedUser && storedToken && !user) {
      dispatch({ type: SET_AUTH_TOKEN, payload: storedToken });
      dispatch({ type: UPDATE_AUTH_USER, payload: storedUser });
      dispatch({ type: USER_LOADED });
    } else if (!storedUser || !storedToken) {
      if (storedUser) {
        localStorage.removeItem('user');
      }
      localStorage.removeItem('token');
      dispatch({ type: USER_LOADED });
    }

    setVerifying(false);
  }, [dispatch, user]);

  useEffect(() => {
    if (!verifying && !loading) {
      if (user) {
        const accessToken = localStorage.getItem('accessToken');
        const hasAccessToken =
          accessToken && accessToken !== 'undefined' && accessToken !== 'null';
        if (
          hasAccessToken &&
          (localStorage.getItem('newUser') === 'true' ||
            (newUser && newUser === 'true'))
        ) {
          Router.push(
            companyRegistrationUrl + (queryParams ? '?' + queryParams : ''),
          );
        } else if (pathname === '/signin' || pathname === '/signup') {
          if (
            localStorage.getItem('accessToken') &&
            localStorage.getItem('accessToken') !== 'undefined' &&
            localStorage.getItem('accessToken') !== 'null'
          ) {
            Router.push(initialUrl);
          }
        }
      } else if (
        pathname !== '/signup' &&
        pathname !== '/signin' &&
        pathname !== '/forget-password' &&
        !String(pathname || '').startsWith('/invite')
      ) {
        Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
      }
    }
  }, [loading, user, newUser, queryParams, pathname, verifying]);

  if (loading || verifying) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
