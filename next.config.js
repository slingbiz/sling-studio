const {PHASE_PRODUCTION_BUILD} = require('next/constants');

// Belt-and-suspenders alongside the sandbox page's own <meta> CSP tag: an
// HTTP header is enforced before the document even parses and also lets us
// set frame-ancestors, which meta tags cannot express at all.
async function sandboxHeaders() {
  return [
    {
      source: '/sandbox/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'none'",
            "script-src 'self' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "font-src 'self' data:",
            "connect-src 'none'",
            "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'none'",
            "form-action 'none'",
            "frame-ancestors 'self'",
          ].join('; '),
        },
        {key: 'X-Content-Type-Options', value: 'nosniff'},
      ],
    },
  ];
}

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
      headers: sandboxHeaders,
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
    headers: sandboxHeaders,
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
