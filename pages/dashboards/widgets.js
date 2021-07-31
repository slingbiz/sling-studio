import React from 'react';
import AppPage from '../../@sling/hoc/AppPage'
import asyncComponent from "../../@sling/utility/asyncComponent";

const Widgets = asyncComponent(() => import('../../modules/dashboard/Widgets'));
export default AppPage(() => <Widgets/>);
