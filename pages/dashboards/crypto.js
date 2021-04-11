import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const Crypto = asyncComponent(() => import('../../modules/dashboard/Crypto'));
export default AppPage(() => <Crypto/>);
