import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const ApiModule = asyncComponent(() => import('../../modules/apisModule'));
export default AppPage(() => <ApiModule />);
