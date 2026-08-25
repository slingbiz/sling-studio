import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import AppPage from '../@sling/hoc/AppPage';

const RedirectToCreate = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/create');
  }, [router]);
  return null;
};

export default AppPage(() => <RedirectToCreate />);
