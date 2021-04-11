import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  imageCardSlide: {
    position: 'relative',
    paddingBottom: 0,
    height: '100%',

    '& .slick-list, & .slick-track, & .slick-slide > div': {
      height: '100%',
    },

    '& .slick-dots': {
      bottom: 30,
    },

    '& .slick-dots li': {
      marginLeft: 6,
      marginRight: 6,
    },

    '& .slick-dots li button': {
      width: 10,
      height: 10,
      [theme.breakpoints.up('xl')]: {
        width: 14,
        height: 14,
      },
    },

    '& .slick-dots li button:before': {
      color: 'transparent',
      border: 'solid 2px #fff',
      opacity: 1,
      borderRadius: '50%',
      width: 10,
      height: 10,
      [theme.breakpoints.up('xl')]: {
        width: 14,
        height: 14,
      },
    },

    '& .slick-dots li.slick-active button:before': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },

    '& .slick-prev': {
      top: 32,
      left: 36,
      zIndex: 3,
    },

    '& .slick-next': {
      top: 32,
      right: 36,
      zIndex: 3,
    },
  },

  imageSlide: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 20,
    height: '100%',
    [theme.breakpoints.up('xl')]: {
      fontSize: 24,
    },
  },

  imageSlideFull: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
    width: '100% !important',
    height: '100% !important',
    objectFit: 'cover !important',
  },

  imageSlideContent: {
    width: '100%',
    height: '100%',
    color: 'white',
    padding: '20px 20px 60px',
    display: 'flex',
    flexDirection: 'column',

    '&:before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'block',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },

    '& > *': {
      position: 'relative',
      zIndex: 3,
    },
  },
  widthFull: {
    width: '100%',
  },
}));

export default useStyles;
