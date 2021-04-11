import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import Loader from '../../core/Loader';

const withData = (ComposedComponent) => (props) => {
  const {user, loading} = useSelector(({auth}) => auth);
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !loading) {
      Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, loading]);
  if (!user || loading) return <Loader />;

  return <ComposedComponent {...props} />;
};
export default withData;
