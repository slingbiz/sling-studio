import React from 'react';

export const errorPagesConfigs = [
  {
    routes: [
      {
        path: '/error-pages/error-404',
        component: React.lazy(() => import('./Error404')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/error-pages/error-500',
        component: React.lazy(() => import('./Error500')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/error-pages/coming-soon',
        component: React.lazy(() => import('./ComingSoon')),
      },
    ],
  },
  {
    routes: [
      {
        path: '/error-pages/maintenance',
        component: React.lazy(() => import('./Maintenance')),
      },
    ],
  },
];
