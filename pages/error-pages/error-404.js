import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";

const Error404 = asyncComponent(() => import('../../modules/errorPages/Error404'));
export default AppPage(() => <Error404/>);
