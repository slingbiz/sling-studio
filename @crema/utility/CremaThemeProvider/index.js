import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
// import moment from 'moment';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import AppContext from '../AppContext';
import AppLocale from '../../../shared/localization';
import {responsiveFontSizes} from '@material-ui/core';
import {isBreakPointDown} from '../Utils';
import {ThemeStyle} from '../../../shared/constants/AppEnums';
import {useUrlSearchParams} from 'use-url-search-params';

const CremaThemeProvider = (props) => {
  const {
    theme,
    isRTL,
    updateThemeMode,
    changeNavStyle,
    updateThemeStyle,
    setRTL,
    updateTheme,
    locale,
  } = useContext(AppContext);
  const {muiLocale} = AppLocale[locale.locale];

  const [params] = useUrlSearchParams({});

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.theme_mode) {
        updateThemeMode(params.theme_mode);
      }
    };
    updateQuerySetting();
  }, [params.theme_mode, updateThemeMode]);

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.is_rtl) {
        setRTL(params.is_rtl);
      }
      if (params.is_rtl || isRTL) {
        document.body.setAttribute('dir', 'rtl');
      } else {
        document.body.setAttribute('dir', 'ltr');
      }
    };
    updateQuerySetting();
  }, [isRTL, params.is_rtl, setRTL]);

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.nav_style) {
        changeNavStyle(params.nav_style);
      }
    };
    updateQuerySetting();
  }, [changeNavStyle, params.nav_style]);

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.theme_style) {
        if (params.theme_style === ThemeStyle.MODERN) {
          if (isBreakPointDown('md')) {
            theme.overrides.MuiCard.root.borderRadius = 20;
            theme.overrides.MuiToggleButton.root.borderRadius = 20;
          } else {
            theme.overrides.MuiCard.root.borderRadius = 30;
            theme.overrides.MuiToggleButton.root.borderRadius = 30;
          }
          theme.overrides.MuiButton.root.borderRadius = 30;
          theme.overrides.MuiCardLg.root.borderRadius = 50;
        } else {
          theme.overrides.MuiCard.root.borderRadius = 4;
          theme.overrides.MuiToggleButton.root.borderRadius = 4;
          theme.overrides.MuiButton.root.borderRadius = 4;
          theme.overrides.MuiCardLg.root.borderRadius = 4;
        }
        updateTheme(theme);
        updateThemeStyle(params.theme_style);
      }
    };
    updateQuerySetting();
  }, [params.theme_style, theme, updateTheme, updateThemeStyle]);

  return (
    <ThemeProvider
      theme={responsiveFontSizes(createMuiTheme(theme, muiLocale))}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {props.children}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default React.memo(CremaThemeProvider);

CremaThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
