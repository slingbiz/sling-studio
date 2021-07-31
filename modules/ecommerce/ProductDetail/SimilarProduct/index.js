import React, {useContext} from 'react';
import {Box, fade} from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GridItem from '../../Products/ProductListing/ProductGrid/GridItem';
import ecommerce from '../../../../@sling/services/db/ecommerce/ecommerceData';
import {AppContext} from '../../../../@sling';

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
    <Box
      p={5}
      marginTop={10}
      bgcolor={fade(theme.palette.background.default, 0.6)}>
      <Box fontSize={18} mt={2}>
        <b> Customer Also Viewed </b>
      </Box>
      <Slider {...settings}>
        {ecommerce.map((item, index) => (
          <Box p={5} key={index}>
            <GridItem key={index} item={item} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SimilarProduct;
