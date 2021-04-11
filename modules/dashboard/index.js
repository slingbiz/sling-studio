import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const dashBoardConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/analytics',
        component: React.lazy(() => import('./Analytics')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/e-commerce',
        component: React.lazy(() => import('./ECommerce')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/health-care',
        component: React.lazy(() => import('./HealthCare')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/academy',
        component: React.lazy(() => import('./Academy')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/crm',
        component: React.lazy(() => import('./CRM')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/crypto',
        component: React.lazy(() => import('./Crypto')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/metrics',
        component: React.lazy(() => import('./Metrics')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/widgets',
        component: React.lazy(() => import('./Widgets')),
      },
    ],
  },
];
