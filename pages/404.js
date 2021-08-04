import React from 'react';
import asyncComponent from '../@sling/utility/asyncComponent';
import AppPage from '../@sling/hoc/DefaultPage/index'


const NotFound = asyncComponent(() =>
  import('../modules/errorPages/Error404/index'),
);
export default AppPage(() => <NotFound />);
