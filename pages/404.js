import React from 'react';
import AppPage from '../@sling/hoc/AppPage';
import asyncComponent from '../@sling/utility/asyncComponent';

const DefaultConfig = asyncComponent(() => import('../modules/defaultModule'));

export default AppPage(() => <DefaultConfig />);
