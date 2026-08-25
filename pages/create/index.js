import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const CreatePage = asyncComponent(() => import('../../modules/createPage'));
export default AppPage(() => <CreatePage />);
