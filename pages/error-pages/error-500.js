import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const Error500 = asyncComponent(() => import('../../modules/errorPages/Error500'));
export default AppPage(() => <Error500/>);
