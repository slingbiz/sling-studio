import React from 'react';
import {useRouter} from 'next/router';
import ForgetPasswordJwtAuth from './ForgetPasswordJwtAuth';

const ForgetPassword = () => {
  const location = useRouter();

  const tab = (location.state && location.state.tab) || 'jwtAuth';

  return (
    <>
      <ForgetPasswordJwtAuth />
    </>
  );
};

export default ForgetPassword;
