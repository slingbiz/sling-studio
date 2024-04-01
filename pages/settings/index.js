import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';

const SettingsModule = asyncComponent(
  () => import('../../modules/settingsModule'),
);
export default AppPage(() => <SettingsModule />);
