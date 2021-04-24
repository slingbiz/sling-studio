import React, {useContext} from 'react';
import {Box} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {AppContext} from '../../index';
import {VIEW_TYPE} from '../../../redux/reducers/Ecommerce';
import ProductGrid from '../../../modules/ecommerce/Products/ProductListing/ProductGrid';
import ProductList from '../../../modules/ecommerce/Products/ProductListing/ProductList';

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
  const {ecommerceList, loading, viewType} = parentProps;
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
