import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  Typography,
  Checkbox,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import {useDispatch, useSelector} from 'react-redux';
import {getMedia} from '../../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},

  appBar: {
    position: 'relative',
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  imgSize: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddMoreImage = ({
  open,
  setOpen,
  arrayImages,
  setArrayImages,
  handleUpdateGallery,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {mediaImages} = useSelector(({media}) => media);
  const [filter, setFilter] = useState('');
  const {media_images} = mediaImages;

  useEffect(() => {
    dispatch(getMedia(filter));
  }, [dispatch, filter]);

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(arrImages, url) {
    if (arrayImages?.images?.find((urlToFind) => urlToFind === url)) {
      setArrayImages({
        id: arrayImages.id,
        images: arrImages?.filter((urlToRemove) => urlToRemove !== url),
        key: arrayImages?.key,
        updated_on: arrayImages?.updated_on,
      });
    } else {
      setArrayImages({
        id: arrayImages.id,
        images: [...arrImages, url],
        key: arrayImages?.key,
        updated_on: arrayImages?.updated_on,
      });
    }
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <Button autoFocus={true} color='inherit' onClick={handleClose}>
            Cancel
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            justify='center'
            spacing={3}
            direction='column'
            alignItems='center'>
            <Grid item xs={12}>
              <Typography
                variant='h6'
                component='h6'
                className={classes.typography}>
                Add or Remove Widgets
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <TextField
                id='filter-images'
                placeholder='Search'
                variant='outlined'
                className={classes.input}
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Grid container spacing={4}>
                {media_images?.map((img, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <Checkbox
                          checked={arrayImages?.images?.find(
                            (url) => url === img?.url,
                          )}
                          onChange={(event) =>
                            handleChange(arrayImages?.images, img?.url)
                          }
                          color='primary'
                          inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <img src={img.url} className={classes.imgSize} />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                style={{marginTop: 20}}
                onClick={handleUpdateGallery}>
                Update Gallery
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default AddMoreImage;
