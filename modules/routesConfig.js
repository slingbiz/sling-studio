const routesConfig = [
  {
    id: 'dashboards',
    title: 'Home',
    messageId: 'sidebar.app.home',
    type: 'item',
    icon: 'home',
    url: '/dashboards/',
  },
  {
    id: 'pages',
    title: 'Page Templates',
    messageId: 'sidebar.app.pagesTemplates',
    type: 'item',
    icon: 'view_quilt',
    url: '/pages/',
  },

  {
    id: 'routes',
    title: 'Routes',
    messageId: 'sidebar.app.routes',
    type: 'item',
    icon: 'http',
    url: '/routes',
  },
  {
    id: 'widgets',
    title: 'Widgets',
    messageId: 'sidebar.app.widgets',
    type: 'item',
    icon: 'widgets',
    url: '/widgets',
  },
  {
    id: 'media',
    title: 'Media',
    messageId: 'sidebar.app.media',
    type: 'item',
    icon: 'photo_camera',
    url: '/media/gallery',
  },
  {
    id: 'settings',
    title: 'Settings',
    messageId: 'sidebar.app.settings',
    type: 'item',
    icon: 'settings',
    url: '/settings',
  },
];
export default routesConfig;
