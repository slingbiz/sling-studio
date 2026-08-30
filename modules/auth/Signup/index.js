import React from 'react';
import SignupJwtAuth from './SignupJwtAuth';
import AuthShell from '../AuthShell';

const Signup = () => (
  <AuthShell
    title='Create an account'
    description='You will get a company, keys, and a storefront you govern.'>
    <SignupJwtAuth />
  </AuthShell>
);

export default Signup;
