import React, {useEffect, useState} from 'react';
import Gallery from 'react-photo-gallery';
import arrayMove from 'array-move';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';

import Photo from './Photo';
import {onGetGalleryPhotos} from '../../../../redux/actions';
import InfoView from '../../../../@crema/core/InfoView';

/* popout the browser and maximize to see more rows! -> */
const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({items}) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

const ReactSortableHoc = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector(({gallery}) => gallery.photos);
  const [items, setItems] = useState(photos);

  useEffect(() => {
    dispatch(onGetGalleryPhotos());
    if (photos.length > 0) {
      setItems(photos);
    }
  }, [dispatch, photos]);

  const onSortEnd = ({oldIndex, newIndex}) => {
    setItems(arrayMove(items, oldIndex, newIndex));
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
      <SortableGallery items={items} onSortEnd={onSortEnd} axis={'xy'} />
      <InfoView />
    </div>
  );
};
export default ReactSortableHoc;
