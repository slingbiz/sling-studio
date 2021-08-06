import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@sling/utility/ContextProvider';
import SlingThemeProvider from '../@sling/utility/SlingThemeProvider';
import SlingStyleProvider from '../@sling/utility/SlingStyleProvider';
import LocaleProvider from '../@sling/utility/LocaleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@sling/services/index';
import AuthRoutes from '../@sling/utility/AuthRoutes';
import PageMeta from '../@sling/core/PageMeta';
import App from 'next/app';
import {default as defaultStaticConfig} from '../@sling/utility/ContextProvider/defaultConfig';
import {useRouter} from "next/router";
import {INIT_CONFIG} from '../shared/constants/Services';


// eslint-disable-next-line react/prop-types
const MyApp = ({Component, pageProps, user, initConfig, layoutConfig}) => {
  const store = useStore({...pageProps, layout: layoutConfig});
  // console.log(pageProps, '@pageprops @myapp');
  // console.log(pageProps.initialReduxState, " @pageprops @Myapp")
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <PageMeta />
      <ContextProvider initConfig={initConfig}>
        <Provider store={store}>
          <SlingThemeProvider>
            <SlingStyleProvider>
              <LocaleProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <Component />
                </AuthRoutes>
              </LocaleProvider>
            </SlingStyleProvider>
          </SlingThemeProvider>
        </Provider>
      </ContextProvider>
    </React.Fragment>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let response = {};
  const {ctx, Component} = appContext;
  const {pathname, query, asPath} = ctx;
  console.log('Running _app.js api call, INIT_CONFIG: ', INIT_CONFIG);
  try {
    //Fetch initial Layout based on url.
    response = await fetch(`${INIT_CONFIG}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pathname, query, asPath}),
    });
    response = await response.json();
  } catch (e) {
    console.log('[MyApp.getInitialProps] - Message', e.message);
    response = {initConfigData: defaultStaticConfig, layoutConfig: {}};
  }

  const {initConfigData, layoutConfig} = response;

  return {initConfig: initConfigData, layoutConfig};
};

export default MyApp;
