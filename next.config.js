const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      env: {
        SERVICE_URL: 'https://sling.biz/api',
        INIT_CONFIG: 'https://sling.biz/api/v1/dashboard/initConfig',
        GET_WIDGETS: 'https://sling.biz/api/v1/widgets/dash/getWidgets',
        GET_MEDIA_API: 'https://sling.biz/api/v1/media/dash/getMedia',
        GET_MEDIA_CONSTANTS_API:
          'https://sling.biz/api/v1/media/dash/getMediaConstants',
        SET_CONFIG: 'https://sling.biz/api/v1/dashboard/setConfig',
        FIREBASE_API_KEY: 'AIzaSyAzL_2jiVBhmiIUFGs2z6-cDR-Hgoedh3k',
        FIREBASE_APP_ID: '1:369173776768:web:895ded916749deebd31965',
        FIREBASE_MESSAGING_SENDER_ID: '369173776768',
        FIREBASE_MEASUREMENT_ID: 'G-976YVMRB4R',
      },
    };
  }
  return {
    env: {
      SERVICE_URL: 'http://localhost:10001/',
      INIT_CONFIG: 'http://localhost:10001/v1/dashboard/initConfig',
      GET_WIDGETS: 'http://localhost:10001/v1/widgets/dash/getWidgets',
      GET_MEDIA_API: 'http://localhost:10001/v1/media/dash/getMedia',
      GET_MEDIA_CONSTANTS_API:
        'http://localhost:10001/v1/media/dash/getMediaConstants',
      SET_CONFIG: 'http://localhost:10001/v1/dashboard/setConfig',
      FIREBASE_API_KEY: 'AIzaSyAzL_2jiVBhmiIUFGs2z6-cDR-Hgoedh3k',
      FIREBASE_APP_ID: '1:369173776768:web:895ded916749deebd31965',
      FIREBASE_MESSAGING_SENDER_ID: '369173776768',
      FIREBASE_MEASUREMENT_ID: 'G-976YVMRB4R',
    },
  };
};
