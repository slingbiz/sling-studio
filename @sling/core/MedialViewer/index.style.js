import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    position: 'relative',
    '& .MuiDialog-paperFullScreen': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  mediaViewerRoot: {
    position: 'relative',
    backgroundColor: 'rgb(49, 53, 65)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cancelBtn: {
    color: theme.palette.common.white,
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  carouselRoot: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    '& .slick-slide': {
      textAlign: 'center',
      position: 'relative',
      '& img': {
        width: 'auto !important',
        maxHeight: '96vh',
        height: 'auto !important',
      },
      '& > *': {
        positin: 'relative',
        zIndex: 9,
      },
    },
    '& .slick-dots': {
      bottom: 10,
    },
    '& .slick-dots li button:before, & .slick-dots li.slick-active button:before': {
      backgroundColor: theme.palette.background.paper,
    },
    '& .embed-responsive': {
      position: 'relative',
      display: 'block',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
      '&:before': {
        content: '""',
        display: 'block',
        paddingTop: '30%',
      },
      '& embed, & iframe, & object, & video': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
      },
    },
    '& .slick-next': {
      right: 0,
    },
    '& .slick-prev': {
      left: 0,
    },
  },
}));

export default useStyles;
