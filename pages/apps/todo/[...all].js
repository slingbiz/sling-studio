import React from 'react';
import AppPage from '../../../@sling/hoc/AppPage';
import asyncComponent from '../../../@sling/utility/asyncComponent';

const Todo = asyncComponent(() => import('../../../modules/apps/ToDo'));
export default AppPage(() => <Todo />);
