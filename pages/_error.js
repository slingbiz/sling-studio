import React from 'react';
import asyncComponent from '../@sling/utility/asyncComponent';

export default asyncComponent(() =>
  import('../modules/errorPages/Error404/index'),
);
