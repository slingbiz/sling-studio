import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index'
import asyncComponent from "../@crema/utility/asyncComponent";

const SignUP = asyncComponent(() => import('../modules/auth/Signup/index'));
export default AppPage(() => <SignUP/>);
