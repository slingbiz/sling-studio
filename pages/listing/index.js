import React from 'react';
import AppPage from '../../@sling/hoc/AppPage';
import asyncComponent from '../../@sling/utility/asyncComponent';
import {INIT_CONFIG} from '../../shared/constants/Services';

const Products = asyncComponent(() =>
  import('../../modules/ecommerce/Products'),
);

export async function getServerSideProps(context) {
  let response = {};
  try {
    response = await fetch(`${INIT_CONFIG}`);
    response = await response.json();
  } catch (e) {
    console.log(
      '[MyApp.getInitialProps] - Using default theme. Error Message',
      e.message,
    );
  }
  console.log('[getServerSideProps] - Json stringied response from api', JSON.stringify(response));
  return {
    props: {response}, // will be passed to the page component as props
  };
}
export default AppPage(() => <Products />);
