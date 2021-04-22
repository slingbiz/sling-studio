import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@crema/utility/ContextProvider';
import CremaThemeProvider from '../@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '../@crema/utility/CremaStyleProvider';
import LocaleProvider from '../@crema/utility/LocaleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@crema/services/index';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import PageMeta from '../@crema/core/PageMeta';
import App from 'next/app';
import {default as defaultStaticConfig} from '../@crema/utility/ContextProvider/defaultConfig';

// eslint-disable-next-line react/prop-types
const MyApp = ({Component, pageProps, user, initConfig, layoutConfig}) => {
  const store = useStore(pageProps);
  console.log(pageProps, '@pageprops @myapp');
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
          <CremaThemeProvider>
            <CremaStyleProvider>
              <LocaleProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <Component {...pageProps} {...layoutConfig} />
                </AuthRoutes>
              </LocaleProvider>
            </CremaStyleProvider>
          </CremaThemeProvider>
        </Provider>
      </ContextProvider>
    </React.Fragment>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let response = {};
  const {ctx} = appContext;
  const {pathname, query, asPath} = ctx;
  console.log('Running _app.js api call');
  try {
    //Fetch initial Layout based on url.
    response = await fetch('http://localhost:10001/v1/dummy/initConfig', {
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
  appContext.ctx.layoutConfig = 234;
  // const appProps = await App.getInitialProps(appContext);

  return {initConfig: initConfigData, layoutConfig};
};

export default MyApp;
