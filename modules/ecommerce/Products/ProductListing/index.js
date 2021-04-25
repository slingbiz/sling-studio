import React, {useEffect} from 'react';
import RenderTree from '../../../../@crema/hoc/RenderTree';
import {useDispatch, useSelector} from 'react-redux';
import {onGetEcommerceData,} from '../../../../redux/actions/Ecommerce';

const ProductListing = () => {
  const layout = useSelector(({layout}) => layout.listing);
  const dispatch = useDispatch();

  const {filterData} = useSelector(({ecommerce}) => ecommerce);

  useEffect(() => {
    dispatch(onGetEcommerceData(filterData));
  }, [dispatch, filterData]);

  return (
    <>
      <RenderTree layout={layout} />
    </>
  );
};

export default ProductListing;