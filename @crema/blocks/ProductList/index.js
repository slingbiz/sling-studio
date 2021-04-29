import React from 'react';
import {Box, Card} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {VIEW_TYPE} from '../../../redux/reducers/Ecommerce';
import ProductGrid from '../../../modules/ecommerce/Products/ProductListing/ProductGrid';
import ProductList from '../../../modules/ecommerce/Products/ProductListing/ProductList';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > div': {
      width: '100%',
    },
  },
}));
const Products = ({parentProps}) => {
  const classes = useStyles();
  const {ecommerceList, viewType} = useSelector(({ecommerce}) => ecommerce);
  const {loading} = useSelector(({common}) => common);

  return (
    <Box className={classes.root} flex={1} display='flex' p={2} height={1}>
      {viewType === VIEW_TYPE.GRID ? (
        <ProductGrid ecommerceList={ecommerceList} loading={loading} />
      ) : (
        <ProductList ecommerceList={ecommerceList} loading={loading} />
      )}
    </Box>
  );
};

export default Products;
