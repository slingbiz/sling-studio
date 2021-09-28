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
import Box from '@material-ui/core/Box';

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
    marginBottom: 10
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
  const {mediaImages, totalCount} = useSelector(({media}) => media);
  const [filter, setFilter] = useState({query: ''});
  const [query, setQuery] = useState('');

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
          <Button autoFocus color='inherit' onClick={handleClose}>
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
                Add or Remove Images
              </Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <TextField
                id='filter-images'
                placeholder='Search Images'
                variant='outlined'
                className={classes.input}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setQuery(event.target.value);
                    setFilter({...filter, query: event.target.value});
                  }
                }}
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
                {mediaImages?.map((img, index) => (
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
                      <Grid
                        item
                        xs={8}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <img src={img.url} className={classes.imgSize} />
                        <Box>{img.title}</Box>
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
