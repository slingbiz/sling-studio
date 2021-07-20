import React from 'react';
import Box from '@material-ui/core/Box';
import GridItem from '../../../modules/ecommerce/Products/ProductListing/ProductGrid/GridItem';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles((theme) => ({}));

const ProductGrid = ({ecommerceList}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4} justifyContent={'center'} width={'auto'}>
      {ecommerceList?.map((item, k) => {
        return (
          <Grid item xs={12} md={4} key={'item-' + k} className={classes.grid}>
            {/*{item.id}*/}
            <GridItem item={item} key={item.id} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default ProductGrid;
