import React, {useCallback, useReducer} from 'react';
import defaultConfig from './defaultConfig';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';
import {contextReducer, ThemeSetting} from './ContextReducer';

const ContextProvider = ({children, initConfig}) => {

  const ContextState = {
    theme: initConfig.theme,
    footer: initConfig.footer,
    footerType: initConfig.footerType,
    themeMode: initConfig.themeMode,
    headerMode: initConfig.headerMode,
    themeStyle: initConfig.themeStyle,
    layoutType: initConfig.layoutType,
    isRTL: initConfig.theme.direction === 'rtl',
    locale: initConfig.locale,
    navStyle: initConfig.navStyle,
    rtAnim: initConfig.rtAnim,
    primary: initConfig.theme.palette.primary.main,
    sidebarColor: initConfig.theme.palette.sidebar.bgColor,
    secondary: initConfig.theme.palette.secondary.main,
  };

  const [state, dispatch] = useReducer(
    contextReducer,
    ContextState,
    () => ContextState,
  );

  const setFooter = (footer) => {
    dispatch({type: ThemeSetting.SET_FOOTER, payload: footer});
  };

  const setFooterType = (footerType) => {
    dispatch({type: ThemeSetting.SET_FOOTER_TYPE, payload: footerType});
  };

  const updateHeaderMode = (headerMode) => {
    dispatch({type: ThemeSetting.UPDATE_HEADER_MODE, payload: headerMode});
  };

  const updateThemeStyle = useCallback((themeStyle) => {
    dispatch({type: ThemeSetting.UPDATE_THEME_STYLE, payload: themeStyle});
  }, []);

  const updateLayoutStyle = (layoutType) => {
    dispatch({type: ThemeSetting.UPDATE_LAYOUT_STYLE, payload: layoutType});
  };

  const changeLocale = (locale) => {
    dispatch({type: ThemeSetting.CHANGE_LOCALE, payload: locale});
  };

  const changeNavStyle = useCallback((navStyle) => {
    dispatch({type: ThemeSetting.CHANGE_NAV_STYLE, payload: navStyle});
  }, []);

  const changeRTAnim = (rtAnim) => {
    dispatch({type: ThemeSetting.CHANGE_RT_ANIM, payload: rtAnim});
  };
  const updatePrimaryColor = (primary) => {
    dispatch({type: ThemeSetting.UPDATE_PRIMARY_COLOR, payload: primary});
  };

  const updateSidebarColor = (sidebarColor) => {
    dispatch({type: ThemeSetting.UPDATE_SIDEBAR_COLOR, payload: sidebarColor});
  };

  const updateSecondaryColor = (secondary) => {
    dispatch({type: ThemeSetting.UPDATE_SECONDARY_COLOR, payload: secondary});
  };

  const updateThemeMode = useCallback((themeMode) => {
    dispatch({type: ThemeSetting.UPDATE_THEME_MODE, payload: themeMode});
  }, []);
  const updateTheme = (theme) => {
    dispatch({type: ThemeSetting.UPDATE_THEME, payload: theme});
  };

  const setRTL = useCallback((rtl) => {
    dispatch({type: ThemeSetting.SET_RTL, payload: rtl});
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateLayoutStyle,
        rtlLocale: initConfig.rtlLocale,
        setRTL,
        updateSidebarColor,
        setFooter,
        setFooterType,
        updateThemeStyle,
        updateTheme,
        updateHeaderMode,
        updateThemeMode,
        updatePrimaryColor,
        updateSecondaryColor,
        changeLocale,
        changeNavStyle,
        changeRTAnim,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initConfig: PropTypes.object,
};
