import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const Metrics = asyncComponent(() => import('../../modules/dashboard/Metrics'));
export default AppPage(() => <Metrics/>);
