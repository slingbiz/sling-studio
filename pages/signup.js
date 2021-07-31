import React from 'react';
import AppPage from '../@sling/hoc/DefaultPage/index'
import asyncComponent from "../@sling/utility/asyncComponent";

const SignUP = asyncComponent(() => import('../modules/auth/Signup/index'));
export default AppPage(() => <SignUP/>);
