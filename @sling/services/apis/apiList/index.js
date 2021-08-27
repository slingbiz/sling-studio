import mock from '../../MockConfig';

const pageTemplates = [
  {
    id: 'listing-page-template-id',
    global_id: 'listing-global-id',
    name: 'listing',
    description: 'Page template to show product or entity list',
    template_img: '/dummy.png',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    version: '1.2.0',
  },
  {
    id: 'detail-page-template-id',
    global_id: 'detail-global-id',
    name: 'detail',
    description: 'Page template to show product or entity detail page',
    template_img: '/dummy-detail.png',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    version: '1.2.0',
  },
  {
    id: 'promotion-page-1-template-id',
    global_id: 'promotion-page-1-global-id',
    name: 'promotion page 1',
    description: 'Static Page template to show promotions.',
    template_img: '/dummy-detail.png',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    version: '1.2.0',
  },
  {
    id: 'promotion-seasonal-page-1-template-id',
    global_id: 'promotion-seasonal-1-global-id',
    name: 'promotion seasonal 1',
    description: 'Static Page template to show promotions.',
    template_img: '/dummy-detail.png',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    version: '1.2.0',
  },
];

const routesList = [
  {
    id: 'url-id-1',
    url_string: '/blog/<blog_slug>',
    regex_pattern: '',
    sample_url_string: '/blog/my-new-blog-slug',
    type: 'dynamic',
    keys: ['blog_slug'], //matching keys from url string which will have values in the initial request
    page_template: 'listing', //attached pagetype
    version: '1.2.0',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    is_active: true,
    page_type_advanced: true, //Does this route overrides the default page template
  },
  {
    id: 'url-id-2',
    url_string: '/used-cars/<city_id>/<location_id>/<brand_name>-cars-for-sale',
    regex_pattern: '',
    type: 'dynamic',
    keys: ['city_id', 'location_id', 'brand_name'],
    page_template: 'listing',
    version: '1.9.0',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    is_active: true,
    page_type_advanced: true,
  },
  {
    id: 'url-id-3',
    url_string: '/detail/some-random-string-with-id-<detail_id>',
    regex_pattern: '',
    type: 'dynamic',
    keys: ['detail_id'],
    page_template: 'detail',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    version: '2.8.1',
    is_active: false,
    page_type_advanced: false,
  },
  {
    id: 'url-id-4',
    url_string: '/some-static-page-with-some-text',
    regex_pattern: '',
    type: 'simple',
    keys: [],
    page_template: 'detail',
    added_on: '2021-02-03:00:12:12',
    updated_on: '2021-03-03:00:12:12',
    version: '1.3.0',
    is_active: true,
    page_type_advanced: false,
  },
];

const demoApiList = [
  {
    key: 'listing',
    title: 'Product List Api',
    description: 'Product list search Api with aggregated filters',
    image_url: '',
    icon: '',
    enabled: true,
  },
  {
    key: 'detail',
    title: 'Category List Api',
    description: 'List of all available categories',
    image_url: '',
    icon: '',
    enabled: true,
  },
  {
    key: 'home',
    title: 'User Details Api',
    description: 'Logged in User Details',
    image_url: '',
    icon: '',
    enabled: true,
  },
  {
    key: 'home',
    title: 'Product Details Api',
    description: 'Details of a single product',
    image_url: '',
    enabled: true,
  },
];

mock.onGet('/api/getApiList').reply(200, demoApiList);
mock
  .onGet('/api/getRoutes')
  .reply(200, {routes_list: routesList, client_id: 'xyz-uniq-id'});

mock
  .onGet('/api/getPageTemplates')
  .reply(200, {page_templates: pageTemplates, client_id: 'xyz-uniq-id'});

mock.onPost('/api/addApi').reply((request) => {
  const reqData = JSON.parse(request.data);
  console.log('reqData, @mock add api ', reqData);
  return [200, {message: 'Added successfully', status: true}];
});

mock.onPost('/api/saveRoute').reply((request) => {
  const reqData = JSON.parse(request.data);
  console.log('reqData, @mock save route ', reqData);
  return [200, {message: 'Saved successfully', status: true}];
});
