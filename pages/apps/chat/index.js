import React from 'react';
import AppPage from '../../../@sling/hoc/AppPage';
import asyncComponent from '../../../@sling/utility/asyncComponent';

const Chat = asyncComponent(() => import('../../../modules/apps/Chat'));
export default AppPage(() => <Chat />);
