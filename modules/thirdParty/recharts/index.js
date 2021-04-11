import React from 'react';
import {authRole} from '../../../shared/constants/AppConst';

export const rechartsConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/area',
        component: React.lazy(() => import('./Area')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/bar',
        component: React.lazy(() => import('./Bar')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/composed',
        component: React.lazy(() => import('./Composed')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/line',
        component: React.lazy(() => import('./Line')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/pie',
        component: React.lazy(() => import('./Pie')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/radar',
        component: React.lazy(() => import('./Radar')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/radial',
        component: React.lazy(() => import('./Radial')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/treemap',
        component: React.lazy(() => import('./Treemap')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/scatter',
        component: React.lazy(() => import('./Scatter')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/recharts/funnel',
        component: React.lazy(() => import('./Funnel')),
      },
    ],
  },
];
