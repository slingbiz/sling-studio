import React from 'react';
import SigninJwtAuth from './SigninJwtAuth';
import AuthShell from '../AuthShell';

const Signin = () => (
  <AuthShell
    title='Sign in'
    description='Open Studio to create a page, then publish when you are ready.'>
    <SigninJwtAuth />
  </AuthShell>
);

export default Signin;
