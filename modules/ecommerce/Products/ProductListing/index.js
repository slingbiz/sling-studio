import React, {useContext, useEffect} from 'react';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import ProductHeader from '../ProductHeader';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_TYPE} from '../../../../redux/reducers/Ecommerce';
import ProductGrid from './ProductGrid/index';
import {
  onGetEcommerceData,
  setFilters,
} from '../../../../redux/actions/Ecommerce';
import ProductList from './ProductList';
import AppsContent from '../../../../@crema/core/AppsContainer/AppsContent';
import {Box, fade} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {AppContext} from '../../../../@crema';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > div': {
      width: '100%',
    },
  },
}));

const ProductListing = () => {
  const {viewType} = useSelector(({ecommerce}) => ecommerce);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {theme} = useContext(AppContext);

  const {ecommerceList, filterData} = useSelector(({ecommerce}) => ecommerce);
  const {loading} = useSelector(({common}) => common);

  const searchProduct = (title) => {
    dispatch(setFilters({...filterData, title}));
  };
  useEffect(() => {
    dispatch(onGetEcommerceData(filterData));
  }, [dispatch, filterData]);

  return (
    <>
      <AppsHeader>
        <ProductHeader viewType={viewType} onChange={searchProduct} />
      </AppsHeader>

      <AppsContent
        style={{backgroundColor: fade(theme.palette.background.default, 0.6)}}>
        <Box className={classes.root} flex={1} display='flex' p={2} height={1}>
          {viewType === VIEW_TYPE.GRID ? (
            <ProductGrid ecommerceList={ecommerceList} loading={loading} />
          ) : (
            <ProductList ecommerceList={ecommerceList} loading={loading} />
          )}
        </Box>
      </AppsContent>
    </>
  );
};

export default ProductListing;
