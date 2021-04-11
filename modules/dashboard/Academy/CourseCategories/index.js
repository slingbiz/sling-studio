import React from "react";
import AppCard from "../../../../@crema/core/AppCard";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
import { Fonts } from "../../../../shared/constants/AppEnums";

const useStyles = makeStyles((theme) => ({
  sliderRoot: {
    position: "relative",
    "& .slick-slide img": {
      height: "auto",
      width: "100%"
    },
    "& .slick-dots": {
      padding: "0 16px",
      bottom: 0
    },
    "& .slick-dots li": {
      width: "33%",
      height: "auto",
      margin: 0
    },
    "& .slick-dots li button": {
      width: "90%",
      height: 4,
      position: "relative",
      "&:before": {
        width: "100%",
        height: 4,
        content: "\"\"",
        fontSize: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 30,
        opacity: 0.15
      },
      "&:hover, &:focus": {
        "&:before": {
          opacity: 0.8
        }
      }
    },
    "& .slick-dots li.slick-active button": {
      "&:before": {
        opacity: 0.8
      }
    }
  },
  titleRoot: {
    fontSize: 16,
    fontWeight: Fonts.BOLD
  },
  badgeRoot: {
    padding: "3px 12px",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("xl")]: {
      padding: "3px 18px"
    },
    "& img": {
      marginRight: 5
    }
  }
}));

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const CourseCategories = ({ course }) => {
  const { images, title, desc, lessons, xp } = course;
  const classes = useStyles();
  return (
    <AppCard height={1} contentStyle={{ padding: 0 }}>
      <Slider className={classes.sliderRoot} {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img src={image.image} alt={image.title} />
          </Box>
        ))}
      </Slider>
      <Box p={4} pt={3}>
        <Box component='h5' mb={1} className={classes.titleRoot}>
          {title}
        </Box>
        <Box component='p' mb={4} color='text.secondary'>
          {desc}
        </Box>
        <Box display='flex' alignItems='center'>
          <Box className={classes.badgeRoot} color='#259BE0' bgcolor='#E7F4FC'>
            <img
              src={"/images/dashboard/academy/lessons.png"}
              alt='lessons'
            />
            {lessons} Lessons
          </Box>
          <Box
            ml='auto'
            className={classes.badgeRoot}
            color='#FCB267'
            bgcolor='#FFF5EB'>
            <img src={"/images/dashboard/academy/xp.png"} alt='xp' /> {xp}{" "}
            XP
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default CourseCategories;
