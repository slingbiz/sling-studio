import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const Metrics = asyncComponent(() => import('../../modules/dashboard/Metrics'));
export default AppPage(() => <Metrics/>);
