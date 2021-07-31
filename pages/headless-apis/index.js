import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const ApiModule = asyncComponent(() => import('../../modules/apisModule'));
export default AppPage(() => <ApiModule />);
