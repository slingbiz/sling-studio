import React from 'react';
import {authRole} from '../../../shared/constants/AppConst';

export const mapConfigs = [
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/directions',
        component: React.lazy(() => import('./Directions')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/drawing-view',
        component: React.lazy(() => import('./DrawingView')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/event-handler',
        component: React.lazy(() => import('./EventHandler')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/geolocation',
        component: React.lazy(() => import('./GeoLocation')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/km-layer',
        component: React.lazy(() => import('./KmLayer')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/map-clustering',
        component: React.lazy(() => import('./MapClustering')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/map-overlay',
        component: React.lazy(() => import('./MapOverlay')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/map-with-search-box',
        component: React.lazy(() => import('./MapWithSearchBox')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/popup-info',
        component: React.lazy(() => import('./PopUpInfo')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/simple',
        component: React.lazy(() => import('./Simple')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/street-view',
        component: React.lazy(() => import('./StreetView')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/styled',
        component: React.lazy(() => import('./Styled')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/third-party/google-map/traffic-layer',
        component: React.lazy(() => import('./TrafficLayer')),
      },
    ],
  },
];
