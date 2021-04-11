import React, {useCallback, useEffect} from 'react';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';
import {useDispatch, useSelector} from 'react-redux';
import {onGetGalleryPhotos} from '../../../../redux/actions';
import InfoView from '../../../../@crema/core/InfoView';
import {makeStyles} from '@material-ui/core';

const CustomImage = (props) => {
  const photos = useSelector(({gallery}) => gallery.photos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetGalleryPhotos());
  }, [dispatch]);

  const imageRenderer = useCallback(
    ({index, left, top, key, photo}) => (
      <SelectedImage
        key={key}
        margin={'2px'}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [],
  );

  const useStyles = makeStyles((theme) => ({
    galleryPhoto: {
      position: 'relative',

      '& img': {
        borderRadius: theme.overrides.MuiCard.root.borderRadius,
        objectFit: 'cover',
        maxHeight: 260,
      },
    },
  }));

  const classes = useStyles(props);

  return (
    <div className={classes.galleryPhoto}>
      <Gallery photos={photos} renderImage={imageRenderer} />
      <InfoView />
    </div>
  );
};
export default CustomImage;
