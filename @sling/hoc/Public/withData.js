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
    console.log('useEffect triggered for user verification');
    console.log('user:', user);
    console.log('loading:', loading);
    console.log('newUser:', newUser);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken && !user) {
      console.log('Setting user and token from local storage');
      dispatch({ type: SET_AUTH_TOKEN, payload: storedToken });
      dispatch({ type: UPDATE_AUTH_USER, payload: storedUser });
      dispatch({ type: USER_LOADED });
    } else if (!storedUser || !storedToken) {
      console.log('No user or token found in local storage, clearing user data');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch({ type: USER_LOADED }); // Set loading to false if no user in local storage
    }

    setVerifying(false);
  }, [dispatch, user]);

  useEffect(() => {
    if (!verifying && !loading) {
      if (user) {
        if (
          localStorage.getItem('newUser') === 'true' ||
          (newUser && newUser === 'true')
        ) {
          console.log('Redirecting to company registration page');
          Router.push(
            companyRegistrationUrl + (queryParams ? '?' + queryParams : ''),
          );
        } else if (pathname === '/signin' || pathname === '/signup') {
          console.log('Redirecting to initial URL');
          Router.push(initialUrl);
        }
      } else if (pathname !== '/signup' && pathname !== '/signin' && pathname !== '/forget-password') {
        console.log('No user authenticated, redirecting to sign in');
        Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
      }
    }
  }, [loading, user, newUser, queryParams, pathname, verifying]);

  if (loading || verifying) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
