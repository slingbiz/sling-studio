import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index'
import asyncComponent from "../@crema/utility/asyncComponent";

const SignIn = asyncComponent(() => import('../modules/auth/Signin/index'));
export default AppPage(() => <SignIn/>);
