import React, {useEffect} from 'react';
import RenderTree from '../../../../@crema/hoc/RenderTree';
import {useDispatch, useSelector} from 'react-redux';
import {onGetEcommerceData} from '../../../../redux/actions/Ecommerce';
import CustomizedBreadcrumbs from '../../../muiComponents/navigation/BreadCrumbs/CustomizedBreadcrumbs';
import Box from '@material-ui/core/Box';

const ProductListing = () => {
  const layout = useSelector(({layout}) => layout.listing);
  const dispatch = useDispatch();

  const {filterData} = useSelector(({ecommerce}) => ecommerce);

  useEffect(() => {
    dispatch(onGetEcommerceData(filterData));
  }, [dispatch, filterData]);

  return (
    <>
      <Box>
        <CustomizedBreadcrumbs />
      </Box>
      <RenderTree layout={layout} />
    </>
  );
};

export default ProductListing;
