import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const PageConfig = asyncComponent(() => import('../../modules/pagesModule'));
export default AppPage(() => <PageConfig />);
