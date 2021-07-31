import mock from '../../MockConfig';
import ecommerceData from '../../db/extraPages/ecommerce/ecommerceData';

mock.onGet('/api/ecommerce/list').reply(200, ecommerceData);
