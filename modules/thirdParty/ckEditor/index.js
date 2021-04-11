import React from 'react';

export const ckEditorConfigs = [
  {
    auth: 'user',
    routes: [
      {
        path: '/ck-editor/balloon',
        component: React.lazy(() => import('./Balloon')),
      },
    ],
  },
  {
    auth: 'user',
    routes: [
      {
        path: '/ck-editor/balloon-block',
        component: React.lazy(() => import('./BalloonBlock')),
      },
    ],
  },
  {
    auth: 'user',
    routes: [
      {
        path: '/ck-editor/classic',
        component: React.lazy(() => import('./Classic')),
      },
    ],
  },
  {
    auth: 'user',
    routes: [
      {
        path: '/ck-editor/document',
        component: React.lazy(() => import('./Document')),
      },
    ],
  },
  {
    auth: 'user',
    routes: [
      {
        path: '/ck-editor/inline',
        component: React.lazy(() => import('./Inline')),
      },
    ],
  },
];
