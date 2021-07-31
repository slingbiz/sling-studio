import React from 'react';
import AppGrid from '../../../../../@sling/core/AppGrid';
import GridItem from './GridItem';
import ListEmptyResult from '../../../../../@sling/core/AppList/ListEmptyResult';

const ProductGrid = ({ecommerceList, loading}) => (
  <AppGrid
    delay={0}
    responsive={{
      xs: 1,
      sm: 2,
      xl: 3,
    }}
    data={ecommerceList}
    renderRow={(item) => <GridItem item={item} key={item.id} />}
    ListEmptyComponent={
      <ListEmptyResult content='No product found' loading={loading} />
    }
  />
);
export default ProductGrid;
