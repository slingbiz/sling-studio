import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography, Button, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {useSelector, useDispatch} from 'react-redux';
import {
  getMediaConstants,
  updateMediaConstant,
} from '../../../../redux/actions';
import AddMoreImage from './AddMoreImages';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  hoverContainer: {
    position: 'relative',
  },
  hoverDiv: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundColor: '#000000',
    opacity: 0,
    '&:hover': {
      opacity: 0.3,
      cursor: 'pointer',
    },
  },
  Icon: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  imgSize: {
    width: 90,
  },
}));

const Constants = (props) => {
  const [constantsImage, setConstantsImage] = useState();
  const [arrayImages, setArrayImages] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {mediaConstants} = useSelector(({media}) => media);
  const classes = useStyles(props);

  const {media_constants} = mediaConstants;

  useEffect(() => {
    dispatch(getMediaConstants());
  }, [dispatch]);

  useEffect(() => {
    setConstantsImage(media_constants);
  }, [media_constants]);

  function handleClickAdd(item) {
    setArrayImages(item);
    setOpen(true);
  }

  function handleUpdateGallery() {
    setConstantsImage(
      constantsImage?.map((item) =>
        item?.id === arrayImages?.id
          ? {...item, images: arrayImages?.images}
          : item,
      ),
    );
    setOpen(false);
  }

  function handleDelete(id, img) {
    setConstantsImage(
      constantsImage?.map((item) =>
        item.id === id
          ? {...item, images: item.images.filter((url) => url !== img)}
          : item,
      ),
    );
  }

  function handleSave() {
    const data = {
      id: arrayImages?.id,
      update: {
        images: arrayImages?.images,
      },
    };

    dispatch(updateMediaConstant(data));
  }

  console.log(constantsImage);

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Media Constants
        </Box>
      </AppsHeader>
      {constantsImage?.map((item, id) => (
        <Grid container key={id} spacing={1} className={classes.mainContainer}>
          <Grid item xs={2}>
            <Typography variant='h6' component='h6'>
              {item?.key}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              {item?.images?.map((imgUrl, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={index}
                  className={classes.hoverContainer}>
                  <img src={imgUrl} className={classes.imgSize} />
                  <div className={classes.hoverDiv}>
                    <CloseIcon
                      onClick={() => handleDelete(item?.id, imgUrl)}
                      style={{color: '#ffffff'}}
                      className={classes.Icon}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleClickAdd(item)}>
                  +Add
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <AddMoreImage
        open={open}
        setOpen={setOpen}
        arrayImages={arrayImages}
        setArrayImages={setArrayImages}
        handleUpdateGallery={handleUpdateGallery}
      />
    </>
  );
};

export default Constants;
