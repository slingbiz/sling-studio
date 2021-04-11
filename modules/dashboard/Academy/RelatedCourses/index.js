import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CourseItem from './CourseItem';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  slideRoot: {
    paddingBottom: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: -12,
      marginRight: -12,
    },
    '& .slick-slide': {
      '&  img': {
        height: 'auto',
        borderRadius: theme.overrides.MuiCard.root.borderRadius,
      },
    },
    '& .slick-prev, & .slick-next': {
      top: -25,
      '&:before': {
        color: theme.palette.text.primary,
      },
    },
    '& .slick-prev': {
      right: 32,
      left: 'auto',
    },
    '& .slick-next': {
      right: 10,
    },
  },
}));

const RelatedCourses = ({relatedCourses}) => {
  const {messages} = useIntl();
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  return (
    <AppCard height={1} title={messages['academy.relatedCourses']}>
      <Slider className={classes.slideRoot} {...settings}>
        {relatedCourses.map((data, index) => (
          <CourseItem key={index} data={data} />
        ))}
      </Slider>
    </AppCard>
  );
};

export default RelatedCourses;
