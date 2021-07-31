import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const Crypto = asyncComponent(() => import('../../modules/dashboard/Crypto'));
export default AppPage(() => <Crypto/>);
