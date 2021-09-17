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

const mediaImages = [
  {
    id: 'uid1',
    url: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid2',
    url: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid3',
    url: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid4',
    url: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid5',
    url: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid6',
    url: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid7',
    url: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid8',
    url: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
  {
    id: 'uid9',
    url: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    name: 'lorem ipsum image name 1',
    key: 'lorem_ipsum_key1',
    alt_text: 'alt text lorem ipsum key1',
    size: '120x540,450kb',
    upload_date: '2021-09-02:00:00:00',
  },
];

const mediaConstants = [
  {
    id: 'media-constant-id-1',
    key: 'array_key1',
    images: [
      'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    ],
    updated_on: '2021-09-02:00:00:00',
  },
  {
    id: 'media-constant-id-2',
    key: 'array_key2',
    images: [
      'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    ],
    updated_on: '2021-09-02:00:00:00',
  },
  {
    id: 'media-constant-id-3',
    key: 'array_key3',
    images: [
      'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    ],
    updated_on: '2021-09-02:00:00:00',
  },
  {
    id: 'media-constant-id-4',
    key: 'array_key4',
    images: [
      'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    ],
    updated_on: '2021-09-02:00:00:00',
  },
];

mock.onGet('/api/getApiList').reply(200, demoApiList);

mock
  .onGet('/api/getRoutes')
  .reply(200, {routes_list: routesList, client_id: 'xyz-uniq-id'});

mock
  .onGet('/api/getPageTemplates')
  .reply(200, {page_templates: pageTemplates, client_id: 'xyz-uniq-id'});

mock
  .onGet('/api/mediaImages')
  .reply(200, {media_images: mediaImages, client_id: 'xyz-uniq-id'});

mock
  .onGet('/api/mediaConstants')
  .reply(200, {media_constants: mediaConstants, client_id: 'xyz-uniq-id'});

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

mock.onPost('/api/saveImage').reply((request) => {
  const reqData = JSON.parse(request.data);
  console.log('[saveImage] reqData, @mock save image ', reqData);
  return [200, {message: 'Saved successfully', status: true}];
});

mock.onPost('/api/updateMediaConstant').reply((request) => {
  const reqData = JSON.parse(request.data);
  console.log('[updateMediaConstant] reqData, @mock save ', reqData);
  return [200, {message: 'Saved successfully', status: true}];
});
