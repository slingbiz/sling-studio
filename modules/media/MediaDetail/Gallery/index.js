import React, { useState } from 'react';
import {
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  Typography,
  SwipeableDrawer,
  Icon,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Fonts } from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import { SidebarDrawer } from './SidebarDrawer';
import AddImage from './AddImage'

const imagesData = [
  {
    id: 1,
    name: 'Image 1',
    imageUrl:
      'https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 2,
    name: 'Image 2',
    imageUrl:
      'https://images.pexels.com/photos/8801900/pexels-photo-8801900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 1,
    name: 'Image 1',
    imageUrl:
      'https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 2,
    name: 'Image 2',
    imageUrl:
      'https://images.pexels.com/photos/8801900/pexels-photo-8801900.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
];

const useStyles = makeStyles((theme) => ({
  input: {
    '& .MuiInputBase-input': {
      height: 10,
    },
  },
  gridPadding: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 6,
    paddingLeft: 6,
  },
  imgContainer: {
    cursor: 'pointer',
  },
  Icon: {
    fontSize: 50,
    position: 'fixed',
    bottom: 20,
    right: 55,
    cursor: 'pointer',
  },
}));

const Gallery = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imgDetails, setImgDetails] = useState({});

  const toggleDrawer = (value, item) => {
    setOpenDrawer(value);
    setImgDetails(item);
  };

  return (
    <>
      <AddImage setOpen={setOpenModal} open={openModal} pageKey="Add New Image" titleKey="add-new-image" />
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Media Gallery
        </Box>
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
      </AppsHeader>
      <Grid container alignItems='baseline' className={classes.gridPadding}>
        {imagesData.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Grid
              container
              alignItems='flex-start'
              className={classes.gridPadding}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems='flex-start'
                  direction='column'
                  className={classes.imgContainer}>
                  <Grid item xs={12}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      onClick={() => toggleDrawer(true, item)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' component='h6'>
                      {item.name}
                    </Typography>
                    <Typography component='span'>
                      Updated: Last year
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <SwipeableDrawer
        anchor='right'
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}>
        <SidebarDrawer toggleDrawer={toggleDrawer} details={imgDetails} />
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenModal(true)} >
        <Icon color='secondary' className={classes.Icon}  >
          add_circle
        </Icon>
      </IconButton>
    </>
  );
};

export default Gallery;
