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
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken && !user) {
      dispatch({type: SET_AUTH_TOKEN, payload: storedToken});
      dispatch({type: UPDATE_AUTH_USER, payload: storedUser});
      dispatch({type: USER_LOADED});
    }

    if (user) {
      if (
        localStorage.getItem('newUser') === 'true' ||
        (newUser && newUser === 'true')
      ) {
        Router.push(
          companyRegistrationUrl + (queryParams ? '?' + queryParams : ''),
        );
      }
    } else if (!loading) {
      Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, loading, newUser, queryParams, dispatch]);

  if (!user || loading) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
