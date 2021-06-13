import React, {useEffect, useState} from 'react';
import ProductsCategory from './ProductsCategory';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Divider from '@material-ui/core/Divider';
import PriceSelector from './PriceSelector';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import AppList from '../../../../@crema/core/AppList';
import CheckedCell from './CheckedCell';
import {
  BrandData,
  DiscountList,
  IdealFor,
  ProductColors,
} from '../../../../@crema/services/db/ecommerce/ecommerceData';
import AppGrid from '../../../../@crema/core/AppGrid';
import ColorCell from './ColorCell';
import RatingCell from './RatingCell';
import {useDispatch, useSelector} from 'react-redux';
import {setFilters} from '../../../../redux/actions/Ecommerce';

const useStyles = makeStyles({
  divider: {
    marginTop: 16,
  },
});
const ProductSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {filterData} = useSelector(({ecommerce}) => ecommerce);
  const [selectedBrand, setSelectedBrand] = useState(filterData.brand);
  const [selectedFor, setSelectedFor] = useState(filterData.ideaFor);
  const [selectedDiscount, setSelectedDiscount] = useState(filterData.discount);
  const [selectedColor, setSelectedColor] = useState(filterData.color);
  const [customerRating, setCustomerRating] = useState(filterData.rating);

  useEffect(() => {
    dispatch(
      setFilters({
        title: filterData.title,
        brand: selectedBrand,
        ideaFor: selectedFor,
        discount: selectedDiscount,
        color: selectedColor,
        rating: customerRating,
      }),
    );
  }, [
    dispatch,
    filterData.title,
    selectedBrand,
    selectedFor,
    selectedDiscount,
    selectedColor,
    customerRating,
  ]);

  const onSelectBrand = (brandId) => {
    if (selectedBrand.some((brand) => brand === brandId)) {
      setSelectedBrand(selectedBrand.filter((brand) => brand !== brandId));
    } else {
      setSelectedBrand(selectedBrand.concat(brandId));
    }
  };

  const onSelectFor = (id) => {
    if (selectedFor.some((item) => item === id)) {
      setSelectedFor(selectedFor.filter((item) => item !== id));
    } else {
      setSelectedFor(selectedFor.concat(id));
    }
  };

  const onSelectDiscount = (id) => {
    if (selectedDiscount.some((item) => item === id)) {
      setSelectedDiscount(selectedDiscount.filter((item) => item !== id));
    } else {
      setSelectedDiscount(selectedDiscount.concat(id));
    }
  };

  const onSelectColor = (id) => {
    if (selectedColor.some((item) => item === id)) {
      setSelectedColor(selectedColor.filter((item) => item !== id));
    } else {
      setSelectedColor(selectedColor.concat(id));
    }
  };

  const onSelectRating = (id) => {
    if (customerRating.some((item) => item === id)) {
      setCustomerRating(customerRating.filter((item) => item !== id));
    } else {
      setCustomerRating(customerRating.concat(id));
    }
  };

  return (
    <Scrollbar className='scroll-app-sidebar'>
      <Box p={6}>
        <Box component='h5' mb={2} fontWeight={Fonts.MEDIUM}>
          Filter By
        </Box>
        <Box color='text.secondary' mb={4} fontWeight={Fonts.MEDIUM}>
          CATEGORIES
        </Box>
        <ProductsCategory />
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          PRICE
        </Box>
        <PriceSelector />
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          BRAND
          <AppList
            data={BrandData}
            renderRow={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectBrand}
                selected={selectedBrand}
              />
            )}
          />
        </Box>
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          IDEAL FOR
          <AppList
            data={IdealFor}
            renderRow={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectFor}
                selected={selectedFor}
              />
            )}
          />
        </Box>
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          DISCOUNT
          <AppList
            data={DiscountList}
            renderRow={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectDiscount}
                selected={selectedDiscount}
              />
            )}
          />
        </Box>
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          COLOR
          <AppGrid
            data={Object.values(ProductColors)}
            column={6}
            itemPadding={10}
            renderRow={(data, index) => (
              <ColorCell
                key={'color-' + index}
                data={data}
                selected={selectedColor}
                onChange={onSelectColor}
              />
            )}
          />
        </Box>
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          CUSTOMER RATINGS
          <AppList
            data={[5, 4, 3, 2, 1]}
            renderRow={(data) => (
              <RatingCell
                key={data}
                data={data}
                onChange={onSelectRating}
                selected={customerRating}
              />
            )}
          />
        </Box>
      </Box>
    </Scrollbar>
  );
};

export default ProductSidebar;
