import React, {useCallback, useEffect, useState} from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, {Modal, ModalGateway} from 'react-images';
import {useDispatch, useSelector} from 'react-redux';

import {onGetGalleryPhotos} from '../../../../redux/actions';
import InfoView from '../../../../@crema/core/InfoView';
import {makeStyles} from '@material-ui/core';

const ReactPhotoGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const photos = useSelector(({gallery}) => gallery.photos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetGalleryPhotos());
  }, [dispatch]);

  const openLightBox = useCallback((event, {photo, index}) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

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
      <Gallery photos={photos} onClick={openLightBox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <InfoView />
    </div>
  );
};
export default ReactPhotoGallery;
