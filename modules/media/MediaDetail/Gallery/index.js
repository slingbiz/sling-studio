import React, {useEffect, useState} from 'react';
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
import {Fonts} from '../../../../shared/constants/AppEnums';
import {getMedia} from '../../../../redux/actions';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {SidebarDrawer} from './SidebarDrawer';
import AddImage from './AddImage';
import {useSelector, useDispatch} from 'react-redux';
import clsx from 'clsx';
import moment from 'moment';
import {Edit} from '@material-ui/icons';
import PaginationControlled from '../../../../@sling/core/Pagination';
import Divider from '@material-ui/core/Divider';
import Scrollbar from '../../../../@sling/core/Scrollbar';

const useStyles = makeStyles(() => ({
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
    position: 'relative',
    minHeight: 150,
    width: '100%',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '0',
  },
  imgSize: {
    width: '100%',
    maxHeight: '150px',
    height: 150,
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    verticalAlign: 'middle',
  },
  Icon: {
    fontSize: 50,
    position: 'fixed',
    bottom: 10,
    right: 55,
    cursor: 'pointer',
  },
  truncate: {
    display: 'box',
    lineClamp: 3,
    boxOrient: 'vertical',
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  titleTruncate: {
    padding: '7px 0 3px 0',
    lineClamp: 1,
  },
}));

const Gallery = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {mediaImages, totalCount} = useSelector(({media}) => media);
  console.log(totalCount, 'totalCount');
  const [filter, setFilter] = useState({page: 0, size: 12, query: ''});
  const [query, setQuery] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imgDetails, setImgDetails] = useState({});

  useEffect(() => {
    dispatch(getMedia(filter));
  }, [dispatch, filter]);

  const toggleDrawer = (value, item) => {
    setOpenDrawer(value);
    setImgDetails(item);
  };

  return (
    <>
      <AddImage
        setOpen={setOpenModal}
        open={openModal}
        pageKey='Add New Image'
        titleKey='add-new-image'
      />
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Media Gallery
        </Box>
        <TextField
          id='filter-images'
          placeholder='Search'
          variant='outlined'
          className={classes.input}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
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
      </AppsHeader>
      <Grid container alignItems='baseline' className={classes.gridPadding}>
        {mediaImages?.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Grid
              container
              alignItems='flex-start'
              className={classes.gridPadding}>
              <Grid item xs={12}>
                <Grid container alignItems='flex-start' direction='column'>
                  <Grid item xs={12} className={classes.imgContainer}>
                    <IconButton
                      aria-label='edit'
                      className={clsx(classes.button, classes.editBtn)}>
                      <Edit onClick={() => toggleDrawer(true, item)} />
                    </IconButton>
                    <img
                      src={item.url}
                      alt={item.title}
                      className={classes.imgSize}
                      onClick={() => toggleDrawer(true, item)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{margin: '10px 0'}}>
                    <Box
                      color='text.primary'
                      fontWeight={Fonts.BOLD}
                      fontSize={16}
                      component='h4'
                      className={clsx(classes.truncate, classes.titleTruncate)}>
                      {item.title}
                    </Box>
                    <Typography
                      component='h6'
                      color='text.secondary'
                      className={clsx(
                        classes.truncate,
                        classes.textSm,
                        classes.descpMargin,
                      )}>
                      {moment(item.upload_date).format('lll')}
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

      <Divider
        style={{borderTop: '1px solid #E5E4EA'}}
        className={classes.divider}
      />
      <Box style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
        <PaginationControlled
          handleChange={(event, page) => {
            setFilter({...filter, page: page - 1});
          }}
          count={Math.ceil(totalCount / filter.size)}
          page={filter.page + 1}
        />
      </Box>
      <IconButton onClick={() => setOpenModal(true)}>
        <Icon color='secondary' className={classes.Icon}>
          add_circle
        </Icon>
      </IconButton>
    </>
  );
};

export default Gallery;
