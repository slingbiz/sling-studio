import React from 'react';
import AppPage from '../../../@sling/hoc/AppPage';
import asyncComponent from '../../../@sling/utility/asyncComponent';

const Wall = asyncComponent(() => import('../../../modules/apps/Wall'));
export default AppPage(() => <Wall />);
