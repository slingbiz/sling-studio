import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {companyRegistrationUrl} from '../../../shared/constants/AppConst';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../core/Loader';
import {
  USER_LOADED,
  UPDATE_AUTH_USER,
  SET_AUTH_TOKEN,
} from '../../../shared/constants/ActionTypes';

const withData = (ComposedComponent) => (props) => {
  const {user, loading, newUser} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const {asPath, pathname} = useRouter();
  const queryParams = asPath.split('?')[1];

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
      dispatch({type: SET_AUTH_TOKEN, payload: storedToken});
      dispatch({type: UPDATE_AUTH_USER, payload: storedUser});
      dispatch({type: USER_LOADED});
    } else if (!storedUser || !storedToken) {
      if (storedUser && !storedToken) {
        localStorage.removeItem('user');
      }
      dispatch({type: USER_LOADED});
    }

    if (!loading) {
      if (user && storedToken) {
        if (
          localStorage.getItem('newUser') === 'true' ||
          (newUser && newUser === 'true')
        ) {
          Router.push(
            companyRegistrationUrl + (queryParams ? '?' + queryParams : ''),
          );
        }
      } else if (pathname !== '/signup' && pathname !== '/signin') {
        Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
      }
    }
  }, [user, loading, newUser, queryParams, dispatch, pathname]);

  const sendingSignedOutToLogin =
    !loading &&
    !user &&
    pathname !== '/signup' &&
    pathname !== '/signin';

  if (loading || sendingSignedOutToLogin) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
