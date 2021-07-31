import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const Error404 = asyncComponent(() => import('../../modules/errorPages/Error404'));
export default AppPage(() => <Error404/>);
