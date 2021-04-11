import React from 'react';
import { useRouter } from 'next/router'
import ForgetPasswordFirebase from './ForgetPasswordFirebase';
import ForgetPasswordAwsCognito from './ForgetPasswordAwsCognito';
import ForgetPasswordJwtAuth from './ForgetPasswordJwtAuth';

const ForgetPassword = () => {
  const location = useRouter();

  const tab = (location.state && location.state.tab) || 'firebase';

  return (
    <>
      {tab === 'firebase' && <ForgetPasswordFirebase />}
      {tab === 'awsCognito' && <ForgetPasswordAwsCognito />}
      {tab === 'jwtAuth' && <ForgetPasswordJwtAuth />}
    </>
  );
};

export default ForgetPassword;
