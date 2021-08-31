import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const MediaModule = asyncComponent(() => import('../../modules/media'));
export default AppPage(() => <MediaModule />);
