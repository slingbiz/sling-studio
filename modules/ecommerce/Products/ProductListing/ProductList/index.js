import React from 'react';
import ListItem from './ListItem';
import AppList from '../../../../../@sling/core/AppList';
import ListEmptyResult from '../../../../../@sling/core/AppList/ListEmptyResult';

const ProductList = ({ecommerceList, loading}) => {
  return (
    <AppList
      data={ecommerceList}
      renderRow={(item) => <ListItem item={item} key={item.id} />}
      ListEmptyComponent={
        <ListEmptyResult content='No product found' loading={loading} />
      }
    />
  );
};

export default ProductList;
