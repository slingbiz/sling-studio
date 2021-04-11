import React, {useEffect} from 'react';
import Gallery from 'react-photo-gallery';
import {useDispatch, useSelector} from 'react-redux';

import {onGetGalleryPhotos} from '../../../../redux/actions';
import InfoView from '../../../../@crema/core/InfoView';
import {makeStyles} from '@material-ui/core';

const Index = (props) => {
  const photos = useSelector(({gallery}) => gallery.photos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetGalleryPhotos());
  }, [dispatch]);

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
      <Gallery photos={photos} /*direction="column"*/ columns={4} />
      <InfoView />
    </div>
  );
};
export default Index;
