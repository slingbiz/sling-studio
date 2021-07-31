import React from 'react';
import AppGrid from '../../../../../@sling/core/AppGrid';
import GridItem from './GridItem';
import ListEmptyResult from '../../../../../@sling/core/AppList/ListEmptyResult';

const ProductGrid = ({ecommerceList, loading}) => (
  <AppGrid
    responsive={{
      xs: 1,
      sm: 6,
      xl: 6,
    }}
    data={ecommerceList}
    renderRow={(item) => <GridItem item={item} key={item.id} />}
    ListEmptyComponent={
      <ListEmptyResult content='No product found' loading={loading} />
    }
  />
);
export default ProductGrid;
