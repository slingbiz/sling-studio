import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const ComingSoon = asyncComponent(() => import('../../modules/errorPages/ComingSoon'));
export default AppPage(() => <ComingSoon/>);
