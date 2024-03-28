/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {
  initialUrl,
  signUpUrl,
  emailVerificationUrl,
  companyRegistrationUrl,
} from '../../../shared/constants/AppConst';
import {useSelector} from 'react-redux';
import Loader from '../../core/Loader';

const withData = (ComposedComponent) => (props) => {
  const {user, loading, newUser, isVerified} = useSelector(({auth}) => auth);
  console.log(
    {user, loading, newUser, isVerified},
    '{user, loading, newUser, isVerified222} ',
  );
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];

  useEffect(() => {
    if (user) {
      if (
        localStorage.getItem('newUser') === 'true' ||
        (newUser && newUser === 'true')
      ) {
        Router.push(
          companyRegistrationUrl + (queryParams ? '?' + queryParams : ''),
        );
      }
    } else {
      if (!loading) {
        Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
      } else {
        return () => {}; // no-op

        // return <Loader />;
      }
    }
  }, [user, loading, newUser, isVerified]);

  if (!user || loading) return <Loader />;
  // if (user) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
