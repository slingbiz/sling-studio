import React from 'react';
import AppPage from '../../../@sling/hoc/AppPage';
import asyncComponent from '../../../@sling/utility/asyncComponent';

const Contact = asyncComponent(() => import('../../../modules/apps/Contact'));
export default AppPage(() => <Contact />);
