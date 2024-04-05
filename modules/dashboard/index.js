import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const dashBoardConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        path: '/dashboards/',
        component: React.lazy(() => import('./Analytics')),
      },
    ],
  },
];
