import React from 'react';
import Box from '@material-ui/core/Box';
import GridItem from '../../../modules/ecommerce/Products/ProductListing/ProductGrid/GridItem';

const ProductGrid = ({ecommerceList}) => (
  <Box display={'flex'}>
    {ecommerceList?.map((item) => {
      return <GridItem item={item} key={item.id} />;
    })}
  </Box>
);
export default ProductGrid;
