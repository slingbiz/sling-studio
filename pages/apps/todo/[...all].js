import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Todo = asyncComponent(() => import('../../../modules/apps/ToDo'));
export default AppPage(() => <Todo />);
