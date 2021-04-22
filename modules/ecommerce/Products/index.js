import React from 'react';
import ProductListing from './ProductListing';
import {useIntl} from 'react-intl';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppsContainer from '../../../@crema/core/AppsContainer';
import ProductsSidebar from './ProductsSidebar';

const Products = (props) => {
  console.log(props, 'props@ [Product/index.js]');
  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['sidebar.ecommerce.products']}
      sidebarContent={<ProductsSidebar />}>
      <ProductListing />
    </AppsContainer>
  );
};

export default Products;
