import React from 'react';
import Slider from 'react-slick/lib';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';
import useStyles from './index.style';
import AppCard from '../../../../@crema/core/AppCard';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CityInfo = (props) => {
  const classes = useStyles(props);

  const {cityData} = props;

  return (
    <AppCard height='1' contentStyle={{padding: 0}}>
      <Slider className={classes.imageCardSlide} {...settings}>
        {cityData.map((city) => {
          return (
            <Box key={city.id} className={classes.imageSlide}>
              <img
                className={classes.imageSlideFull}
                src={city.image}
                alt='building'
              />
              <Box className={classes.imageSlideContent}>
                <Box
                  component='h3'
                  mb={4}
                  fontWeight={Fonts.BOLD}
                  fontSize={16}>
                  {city.name}
                </Box>

                <Box mt='auto'>
                  <Typography component='p'>{city.desc}</Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Slider>
    </AppCard>
  );
};

export default CityInfo;

CityInfo.defaultProps = {
  cityData: [],
};

CityInfo.propTypes = {
  cityData: PropTypes.array,
};
