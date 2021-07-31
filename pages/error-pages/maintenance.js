import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const Maintenance = asyncComponent(() => import('../../modules/errorPages/Maintenance'));
export default AppPage(() => <Maintenance/>);
