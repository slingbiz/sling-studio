import React, { useCallback, useReducer } from "react";
import defaultConfig from "./defaultConfig";
import AppContext from "../AppContext";
import PropTypes from "prop-types";
import { contextReducer, ThemeSetting } from "./ContextReducer";

export const ContextState = {
  theme: defaultConfig.theme,
  footer: defaultConfig.footer,
  footerType: defaultConfig.footerType,
  themeMode: defaultConfig.themeMode,
  headerMode: defaultConfig.headerMode,
  themeStyle: defaultConfig.themeStyle,
  layoutType: defaultConfig.layoutType,
  isRTL: defaultConfig.theme.direction === "rtl",
  locale: defaultConfig.locale,
  navStyle: defaultConfig.navStyle,
  rtAnim: defaultConfig.rtAnim,
  primary: defaultConfig.theme.palette.primary.main,
  sidebarColor: defaultConfig.theme.palette.sidebar.bgColor,
  secondary: defaultConfig.theme.palette.secondary.main
};
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    contextReducer,
    ContextState,
    () => ContextState
  );

  const setFooter = (footer) => {
    dispatch({ type: ThemeSetting.SET_FOOTER, payload: footer });
  };

  const setFooterType = (footerType) => {
    dispatch({ type: ThemeSetting.SET_FOOTER_TYPE, payload: footerType });
  };

  const updateHeaderMode = (headerMode) => {
    dispatch({ type: ThemeSetting.UPDATE_HEADER_MODE, payload: headerMode });
  };

  const updateThemeStyle = useCallback((themeStyle) => {
    dispatch({ type: ThemeSetting.UPDATE_THEME_STYLE, payload: themeStyle });
  }, []);

  const updateLayoutStyle = (layoutType) => {
    dispatch({ type: ThemeSetting.UPDATE_LAYOUT_STYLE, payload: layoutType });
  };

  const changeLocale = (locale) => {
    dispatch({ type: ThemeSetting.CHANGE_LOCALE, payload: locale });
  };

  const changeNavStyle = useCallback((navStyle) => {
    dispatch({ type: ThemeSetting.CHANGE_NAV_STYLE, payload: navStyle });
  }, []);

  const changeRTAnim = (rtAnim) => {
    dispatch({ type: ThemeSetting.CHANGE_RT_ANIM, payload: rtAnim });
  };
  const updatePrimaryColor = (primary) => {
    dispatch({ type: ThemeSetting.UPDATE_PRIMARY_COLOR, payload: primary });
  };

  const updateSidebarColor = (sidebarColor) => {
    dispatch({ type: ThemeSetting.UPDATE_SIDEBAR_COLOR, payload: sidebarColor });
  };

  const updateSecondaryColor = (secondary) => {
    dispatch({ type: ThemeSetting.UPDATE_SECONDARY_COLOR, payload: secondary });
  };

  const updateThemeMode = useCallback((themeMode) => {
    dispatch({ type: ThemeSetting.UPDATE_THEME_MODE, payload: themeMode });
  }, []);
  const updateTheme = (theme) => {
    dispatch({ type: ThemeSetting.UPDATE_THEME, payload: theme });
  };

  const setRTL = useCallback((rtl) => {
    dispatch({ type: ThemeSetting.SET_RTL, payload: rtl });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateLayoutStyle,
        rtlLocale: defaultConfig.rtlLocale,
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
        changeRTAnim
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
