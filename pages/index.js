import React from 'react';
import AppPage from '../@sling/hoc/DefaultPage/index';
import asyncComponent from '../@sling/utility/asyncComponent';

const SignIn = asyncComponent(() => import('../modules/auth/Signin/index'));
export default AppPage(() => <SignIn />);
