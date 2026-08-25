import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import AppPage from '../../@sling/hoc/AppPage';

const RedirectToWidgets = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/widgets');
  }, [router]);
  return null;
};

export default AppPage(() => <RedirectToWidgets />);
