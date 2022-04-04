const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  const {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = process.env;
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      eslint: {
        ignoreDuringBuilds: true,
      },
      env: {
        SERVICE_URL: 'https://sling.biz/api',
        INIT_CONFIG: 'https://sling.biz/api/v1/dashboard/initConfig',
        GET_WIDGETS: 'https://sling.biz/api/v1/widgets/dash/getWidgets',
        GET_MEDIA_API: 'https://sling.biz/api/v1/media/dash/getMedia',
        GET_MEDIA_CONSTANTS_API:
          'https://sling.biz/api/v1/media/dash/getMediaConstants',
        GET_ROUTES_LIST_API:
          'https://sling.biz/api/v1/pageRoutes/dash/getRoutes',
        SET_CONFIG: 'https://sling.biz/api/v1/dashboard/setConfig',
        GUIDE_URL: 'https://sling.biz/documentation',
        SAVE_ROUTE: 'https://sling.biz/api/v1/pageRoutes/saveRoute',
        FIREBASE_JSON: {
          apiKey,
          authDomain,
          databaseURL,
          projectId,
          storageBucket,
          messagingSenderId,
          appId,
          measurementId,
        },
      },
    };
  }
  return {
    eslint: {
      ignoreDuringBuilds: true,
    },
    env: {
      SERVICE_URL: 'http://localhost:10001/',
      INIT_CONFIG: 'http://localhost:10001/v1/dashboard/initConfig',
      GET_WIDGETS: 'http://localhost:10001/v1/widgets/dash/getWidgets',
      GET_MEDIA_API: 'http://localhost:10001/v1/media/dash/getMedia',
      GET_MEDIA_CONSTANTS_API:
        'http://localhost:10001/v1/media/dash/getMediaConstants',
      GET_ROUTES_LIST_API:
        'http://localhost:10001/v1/pageRoutes/dash/getRoutes',
      SET_CONFIG: 'http://localhost:10001/v1/dashboard/setConfig',
      GUIDE_URL: 'https://sling.biz/documentation',
      SAVE_ROUTE: 'http://localhost:10001/v1/pageRoutes/saveRoute',
      FIREBASE_JSON: {
        apiKey,
        authDomain,
        databaseURL,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId,
      },
    },
  };
};
