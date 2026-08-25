import React from 'react';
import AppsContainer from '../../@sling/core/AppsContainer';
import ThemeSettings from '../settingsModule/SettingsDetail/Theme';

const ThemeModule = () => {
  return (
    <AppsContainer title='Theme' fullView>
      <ThemeSettings titleKey='Theme' pageKey='theme' />
    </AppsContainer>
  );
};

export default ThemeModule;
