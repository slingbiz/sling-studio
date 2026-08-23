import React from 'react';
import AppPage from '../../@sling/hoc/Public/index';
import asyncComponent from '../../@sling/utility/asyncComponent';

const AcceptInvite = asyncComponent(() => import('../../modules/auth/AcceptInvite'));
export default AppPage(() => <AcceptInvite />);
