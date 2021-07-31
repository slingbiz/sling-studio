import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Slider from 'react-slick';
import useStyles from './index.style';
import Zoom from '@material-ui/core/Zoom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const renderRow = (data, index) => {
  if (data.metaData.type.startsWith('image')) {
    return (
      <img
        key={index}
        src={data.src}
        alt={data.name ? data.name : 'detail view'}
      />
    );
  } else {
    return (
      <Box className='embed-responsive'>
        <iframe
          key={index}
          src={data.src}
          title={data.name ? data.name : 'detail view'}
        />
      </Box>
    );
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

const MediaViewer = ({index, medias, onClose}) => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (index > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [index]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      className={classes.dialogRoot}
      TransitionComponent={Transition}>
      <Box className={classes.mediaViewerRoot}>
        <IconButton className={classes.cancelBtn} onClick={onClose}>
          <HighlightOffIcon />
        </IconButton>
        {index >= 0 ? (
          <Box className={classes.carouselRoot}>
            <Slider
              settings={{...settings, initialSlide: index}}
              slickGoTo={index}
              containerStyle={{width: '100%'}}>
              {medias.map((data, index) => renderRow(data, index))}
            </Slider>
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
};

export default MediaViewer;
