import React from 'react';
import ProductListing from '../../modules/ecommerce/Products/ProductListing';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_ECOMMERCE_LIST,
  SET_PRODUCT_DATA,
} from '../../shared/constants/ActionTypes';
import Api from '../../@sling/services/ApiConfig';

export default ProductListing;

export async function getServerSideProps(ctx) {
  console.log('Running getServerSideProps.js api call(test.js)');

  // console.log('@onGetEcommerceData START');
  const data = await Api.get('/api/ecommerce/list', {
    params: {filterData: {}},
  });
  if (data.status === 200) {
    // console.log(data.data, 'data.data');
    return {
      props: {
        ecommerce: {
          ecommerceList: data.data,
          filterData: {
            title: '',
            brand: [],
            ideaFor: [],
            discount: [],
            color: [],
            rating: [],
          },
        },
      },
    };
  } else {
    return {props: {}};
  }
}
