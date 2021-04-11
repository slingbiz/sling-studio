import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index'
import asyncComponent from "../@crema/utility/asyncComponent";

const ForgetPassword = asyncComponent(() => import('../modules/auth/ForgetPassword/index'));
export default AppPage(() => <ForgetPassword/>);
