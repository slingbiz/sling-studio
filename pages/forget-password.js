import React from 'react';
import AppPage from '../@sling/hoc/Public/index'
import asyncComponent from "../@sling/utility/asyncComponent";

const ForgetPassword = asyncComponent(() => import('../modules/auth/ForgetPassword/index'));
export default AppPage(() => <ForgetPassword/>);
