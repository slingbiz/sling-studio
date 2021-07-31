import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const ECommerce = asyncComponent(() => import('../../modules/dashboard/ECommerce'));
export default AppPage(() => <ECommerce/>);
