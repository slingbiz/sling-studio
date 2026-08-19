import React from 'react';
import {useRouter} from 'next/router';
import {Provider} from 'react-redux';
import {useStore} from '../redux/store';
import ContextProvider from '../@sling/utility/ContextProvider';
import SlingThemeProvider from '../@sling/utility/SlingThemeProvider';
import SlingStyleProvider from '../@sling/utility/SlingStyleProvider';
import LocaleProvider from '../@sling/utility/LocaleProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/index.css';
import '../styles/devices.css';
import '../@sling/services/index';
import AuthRoutes from '../@sling/utility/AuthRoutes';
import PageMeta from '../@sling/core/PageMeta';
import 'codemirror/lib/codemirror.css';
import Script from 'next/script';

// Routes under /sandbox render untrusted AI-generated widget code inside an
// opaque-origin iframe (see pages/sandbox/widget-preview.js). They must
// never pick up auth/session state, the real Redux store, or third-party
// analytics scripts, so they skip the normal provider tree entirely rather
// than relying only on the iframe boundary to keep that surface out of
// reach.
const SANDBOX_ROUTE_PREFIX = '/sandbox';

const App = ({Component, pageProps, user}) => {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);

  if (router.pathname.startsWith(SANDBOX_ROUTE_PREFIX)) {
    return <Component {...pageProps} />;
  }

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
          <SlingThemeProvider>
            <SlingStyleProvider>
              <LocaleProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <Script
                    strategy='lazyOnload'
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                  />
                  <Script id='ga-analytics'>
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
          
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                    `}
                  </Script>
                  <Component {...pageProps} />
                </AuthRoutes>
              </LocaleProvider>
            </SlingStyleProvider>
          </SlingThemeProvider>
        </Provider>
      </ContextProvider>
    </React.Fragment>
  );
};
export default App;
