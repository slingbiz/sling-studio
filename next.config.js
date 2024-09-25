const {PHASE_PRODUCTION_BUILD} = require('next/constants');

module.exports = (phase) => {
  let serviceUrl = process.env.NEXT_PUBLIC_SERVICE_URL;
  // Check if the URL does not end with a slash and add it if it doesn't
  if (!serviceUrl.endsWith('/')) {
    serviceUrl += '/';
  }

  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      eslint: {
        ignoreDuringBuilds: true,
      },
      env: {
        SERVICE_URL: `${serviceUrl}`,
        INIT_CONFIG: `${serviceUrl}v1/dashboard/initConfig`,
        GET_WIDGETS: `${serviceUrl}v1/widgets/dash/getWidgets`,
        GET_MEDIA_API: `${serviceUrl}v1/media/dash/getMedia`,
        GET_MEDIA_CONSTANTS_API: `${serviceUrl}v1/media/dash/getMediaConstants`,
        GET_ROUTES_LIST_API: `${serviceUrl}v1/pageRoutes/dash/getRoutes`,
        DELETE_ROUTE: `${serviceUrl}v1/pageRoutes/delete`,
        UPDATE_ROUTE: `${serviceUrl}v1/pageRoutes/update`,
        SET_CONFIG: `${serviceUrl}v1/dashboard/setConfig`,
        GUIDE_URL: `https://sling.biz/documentation`,
        SAVE_ROUTE: `${serviceUrl}v1/pageRoutes/saveRoute`,
      },
    };
  }
  return {
    eslint: {
      ignoreDuringBuilds: true,
    },
    env: {
      SERVICE_URL: `${serviceUrl}`,
      INIT_CONFIG: `${serviceUrl}v1/dashboard/initConfig`,
      GET_WIDGETS: `${serviceUrl}v1/widgets/dash/getWidgets`,
      GET_MEDIA_API: `${serviceUrl}v1/media/dash/getMedia`,
      GET_MEDIA_CONSTANTS_API: `${serviceUrl}v1/media/dash/getMediaConstants`,
      GET_ROUTES_LIST_API: `${serviceUrl}v1/pageRoutes/dash/getRoutes`,
      DELETE_ROUTE: `${serviceUrl}v1/pageRoutes/delete`,
      UPDATE_ROUTE: `${serviceUrl}v1/pageRoutes/update`,
      SET_CONFIG: `${serviceUrl}v1/dashboard/setConfig`,
      GUIDE_URL: `https://sling.biz/documentation`,
      SAVE_ROUTE: `${serviceUrl}v1/pageRoutes/saveRoute`,
    },
  };
};
