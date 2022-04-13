import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const WidgetsModule = asyncComponent(() =>
  import('../../modules/widgetsModule'),
);
export default AppPage(() => <WidgetsModule />);
