import React from 'react';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@sling/utility/ContextProvider';
import CremaThemeProvider from '../@sling/utility/CremaThemeProvider';
import CremaStyleProvider from '../@sling/utility/CremaStyleProvider';
import LocaleProvider from '../@sling/utility/LocaleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../@sling/services/index';
import AuthRoutes from '../@sling/utility/AuthRoutes';
import PageMeta from '../@sling/core/PageMeta';

const App = ({Component, pageProps, user}) => {
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <PageMeta />
      <ContextProvider>
        <Provider store={store}>
          <CremaThemeProvider>
            <CremaStyleProvider>
              <LocaleProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <Component {...pageProps} />
                </AuthRoutes>
              </LocaleProvider>
            </CremaStyleProvider>
          </CremaThemeProvider>
        </Provider>
      </ContextProvider>
    </React.Fragment>
  );
};
export default App;
