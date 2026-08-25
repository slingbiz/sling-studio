import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const ThemeModule = asyncComponent(() => import('../../modules/themeModule'));
export default AppPage(() => <ThemeModule />);
