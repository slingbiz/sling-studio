import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const CRM = asyncComponent(() => import('../../modules/dashboard/CRM'));
export default AppPage(() => <CRM/>);
