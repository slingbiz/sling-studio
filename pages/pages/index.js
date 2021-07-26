import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const PageConfig = asyncComponent(() => import('../../modules/pagesModule'));
export default AppPage(() => <PageConfig />);
