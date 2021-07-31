import React from 'react';
import AppPage from '../../../@sling/hoc/AppPage';
import asyncComponent from '../../../@sling/utility/asyncComponent';

const ScrumBoard = asyncComponent(() =>
  import('../../../modules/apps/ScrumBoard'),
);
export default AppPage(() => <ScrumBoard />);
