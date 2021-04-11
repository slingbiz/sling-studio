import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Contact = asyncComponent(() => import('../../../modules/apps/Contact'));
export default AppPage(() => <Contact />);
