import React from 'react';
import AppsContainer from '../../@sling/core/AppsContainer';
import ThemeSettings from '../settingsModule/SettingsDetail/Theme';
import {themeCopy} from '../../@sling/core/AppsContainer/pageIntro';

const ThemeModule = () => {
  return (
    <AppsContainer title={themeCopy.title} description={themeCopy.description} fullView>
      <ThemeSettings titleKey='Theme' pageKey='theme' />
    </AppsContainer>
  );
};

export default ThemeModule;
