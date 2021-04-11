import mock from '../../MockConfig';
import ecommerceData, {
  cartItems,
  customersData,
  recentOrders,
} from '../../db/ecommerce/ecommerceData';
import {multiPropsFilter} from '../../../utility/Utils';

mock.onGet('/api/ecommerce/list').reply((request) => {
  const {filterData} = request.params;
  const data = multiPropsFilter(ecommerceData, filterData);
  return [200, data];
});

mock.onGet('/api/ecommerce/get').reply((request) => {
  const {id} = request.params;
  console.log('id: ', id);
  if (id >= 1 && id <= 12) {
    const data = ecommerceData.filter((item) => +item.id === +id);
    console.log('data', data);
    if (data.length > 0) return [200, data[0]];
  }
  return [200, ecommerceData[0]];
});

mock.onGet('/api/ecommerce/orders').reply((request) => {
  const {search, page} = request.params;

  let orders = [...recentOrders];

  if (search) {
    orders = orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return [
    200,
    {
      orderCount: orders.length,
      orders: orders.splice(page * 10, (page + 1) * 10),
    },
  ];
});

mock.onGet('/api/ecommerce/customers').reply((request) => {
  const {search, page} = request.params;

  let customers = [...customersData];

  if (search) {
    customers = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return [
    200,
    {
      customerCount: customers.length,
      customers: customers.splice(page * 10, (page + 1) * 10),
    },
  ];
});

mock.onGet('/api/cart/get').reply((request) => {
  return [200, cartItems];
});
