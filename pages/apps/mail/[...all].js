import React from 'react';
import AppPage from '../../../@sling/hoc/AppPage';
import asyncComponent from '../../../@sling/utility/asyncComponent';

const Mail = asyncComponent(() => import('../../../modules/apps/Mail'));
export default AppPage(() => <Mail />);
