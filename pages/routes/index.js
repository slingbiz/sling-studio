import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const RoutesModule = asyncComponent(() => import('../../modules/routes'));
export default AppPage(() => <RoutesModule />);
