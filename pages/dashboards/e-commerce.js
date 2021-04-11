import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const ECommerce = asyncComponent(() => import('../../modules/dashboard/ECommerce'));
export default AppPage(() => <ECommerce/>);
