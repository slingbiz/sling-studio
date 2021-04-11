import React, {useContext} from 'react';
import {Box, fade} from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GridItem from '../../Products/ProductListing/ProductGrid/GridItem';
import ecommerce from '../../../../@crema/services/db/ecommerce/ecommerceData';
import {AppContext} from '../../../../@crema';

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SimilarProduct = () => {
  const {theme} = useContext(AppContext);
  return (
    <Box bgcolor={fade(theme.palette.background.default, 0.6)}>
      <Slider {...settings}>
        {ecommerce.map((item, index) => (
          <GridItem key={index} item={item} />
        ))}
      </Slider>
    </Box>
  );
};

export default SimilarProduct;
