import mock from '../../MockConfig';

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
// mock
//   .onPost('/api/addApi')
//   .reply(200, {message: 'Added successfully', status: true});

mock.onPost('/api/addApi').reply((request) => {
  const reqData = JSON.parse(request.data);
  console.log('reqData, @mock add api ', reqData);
  return [200, {message: 'Added successfully', status: true}];
});
