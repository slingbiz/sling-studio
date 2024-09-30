import React, {useEffect, useState} from 'react';
import {
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  SwipeableDrawer,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {useSelector, useDispatch} from 'react-redux';
import {getWidgets, deleteWidget} from '../../../../redux/actions/Widgets';
import {blue} from '@mui/material/colors';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {Edit} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ListEmptyResult from '../../../../@sling/core/AppList/ListEmptyResult';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import AddWidgetModal from './AddWidgetModal';
import UpdateWidgetModal from './AddWidgetModal';
import {InfoView} from '../../../../@sling';

const useStyles = makeStyles((theme) => ({
  input: {
    '& .MuiInputBase-input': {
      height: 10,
    },
  },
  flr: {right: 0},
  posRel: {position: 'relative'},
  textXs: {
    fontSize: 12,
  },
  textRes: {
    fontSize: 12,
    [theme.breakpoints.up('xl')]: {
      fontSize: 14,
    },
  },
  truncate: {
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    display: 'box',
    lineClamp: 3,
    boxOrient: 'vertical',
    truncate: {
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
      // whiteSpace: 'nowrap',
      display: 'box',
      lineClamp: 3,
      boxOrient: 'vertical',
      overflow: 'hidden',
    },
    titleTruncate: {
      padding: '7px 0 3px 0',
      lineClamp: 1,
    },
    overflow: 'hidden',
  },
  titleTruncate: {
    padding: '7px 0 3px 0',
    lineClamp: 1,
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    padding: '4px 12px',
    fontSize: 12,
  },
  descpMargin: {
    marginBottom: 20,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '0',
  },
  itemImg: {
    width: '100%',
    maxHeight: '220px !important',
    height: 220,
    overflow: 'hidden',
    objectFit: 'contain',
    objectPosition: '50% 50%',
    verticalAlign: 'middle',
  },
  gridPadding: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 6,
    paddingLeft: 6,
  },
  itemContainer: {},
  imgContainer: {
    cursor: 'pointer',
    position: 'relative',
    minHeight: 150,
    width: '100%',
  },
  noImgContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: blue['100'],
    minHeight: 150,
    width: '100%',
    background:
      'radial-gradient(circle, rgb(255 255 255) 0%, rgba(255, 152, 0, 0.413624824929972) 100%)',
    backgroundColor: '#bbdefb',
  },
  itemImage: {
    width: '100%',
    maxHeight: '150px !important',
    height: 150,
    overflow: 'hidden',
    objectFit: 'contain',
    objectPosition: '50% 50%',
    verticalAlign: 'middle',
  },
  iconDefault: {
    fontSize: 30,
    cursor: 'pointer',
  },
  Icon: {
    fontSize: 50,
    position: 'fixed',
    bottom: 20,
    right: 55,
    cursor: 'pointer',
  },
  infoRow: {
    marginBottom: 10,
  },
}));

const getWidgetType = (pageKey) => {
  let type = 'widget';
  if (pageKey.includes('block')) {
    type = 'block';
  } else if (pageKey.includes('component')) {
    type = 'component';
  }
  return type;
};

const WidgetsIntegration = (props) => {
  const {titleKey, pageKey} = props;
  const type = getWidgetType(pageKey);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {widgets} = useSelector(({widgets}) => widgets);
  const [filter, setFilter] = useState({type});
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Manage delete confirmation dialog
  const [widgetToDelete, setWidgetToDelete] = useState(null); // Manage widget to delete
  const loading = useSelector(({common}) => common.loading);
  const [updateProp, setupdateProp] = useState(null);
  const [hoveredWidget, setHoveredWidget] = useState(null); // Track the hovered widget

  useEffect(() => {
    dispatch(getWidgets(filter));
  }, [filter]);

  useEffect(() => {
    setFilter({...filter, type});
  }, [type]);

  const toggleDrawer = (value, item) => {
    setOpenDrawer(value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setFilter({...filter, query: event.target.value});
    }
  };

  const handleDeleteFilter = (key) => {
    delete filter[key];
    if (key === 'query') {
      setQuery('');
    }
    setFilter({...filter});
  };

  const handleDeleteWidget = () => {
    if (widgetToDelete) {
      dispatch(deleteWidget(widgetToDelete));
      setWidgetToDelete(null); // Reset after deletion
    }
    setDeleteDialogOpen(false); // Close the dialog after deletion
  };

  const handleDelete = (widgetId) => {
    setWidgetToDelete(widgetId);
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const isAdmin = params.get('isAdmin');
  const allowDelete =
    isAdmin || process.env.NEXT_PUBLIC_DISABLE_DELETE !== 'true';

  return (
    <>
      <AppsHeader>
        <Box
          fontWeight={Fonts.BOLD}
          component='h3'
          style={{textTransform: 'capitalize'}}>
          {type} Integration
        </Box>
        <Box style={{display: 'flex', alignItems: 'center'}}>
          <Box>
            {Object.keys(filter).map((v, key) => {
              return filter[v] && v != 'type' ? (
                <Chip
                  key={key}
                  size={'small'}
                  label={`${v} - ${filter[v]}`}
                  aria-label={`Remove ${v}`}
                  color='primary'
                  variant='outlined'
                  onClick={() => handleDeleteFilter(v)}
                  onDelete={() => handleDeleteFilter(v)}
                />
              ) : (
                ''
              );
            })}
          </Box>
          <Tooltip title='Add a new Widget'>
            <IconButton onClick={() => setOpenModal(true)}>
              <Icon
                color='secondary'
                className={classes.iconDefault}
                aria-label={'Add a new Widget'}>
                add_circle
              </Icon>
            </IconButton>
          </Tooltip>
          <TextField
            id='filter-images'
            placeholder='Search'
            variant='outlined'
            className={classes.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
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
        </Box>
      </AppsHeader>
      <Grid
        container
        alignItems='baseline'
        className={classes.gridPadding}
        spacing={5}
        style={{padding: 20}}>
        {widgets?.map((item, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={index}
            onMouseEnter={() => setHoveredWidget(item._id)} // Set hovered widget ID
            onMouseLeave={() => setHoveredWidget(null)} // Reset hover on leave
            style={{
              minHeight: 365,
            }}>
            <Box
              alignItems='flex-start'
              className={classes.gridPadding}
              style={{
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                borderRadius: '8px',
                minHeight: 365,
              }}>
              <Grid
                container
                alignItems='flex-start'
                direction='column'
                className={classes.itemContainer}>
                <Grid
                  item
                  xs={12}
                  className={
                    item.image ? classes.imgContainer : classes.noImgContainer
                  }>
                  {hoveredWidget === item._id && (
                    <>
                      <IconButton
                        onClick={() => {
                          console.log(item);
                          setupdateProp(item);
                          setOpenUpdateModal(true);
                        }}
                        aria-label='edit'
                        className={clsx(classes.button, classes.editBtn)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        disabled={!allowDelete}
                        aria-label='delete'
                        onClick={() => handleDelete(item._id)} // Open delete confirmation dialog
                        style={{position: 'absolute', top: 0, right: 0}}>
                        <Icon color='grey'>delete</Icon>
                      </IconButton>
                    </>
                  )}
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={classes.itemImage}
                        onClick={() => toggleDrawer(true, item)}
                      />
                    </>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </Grid>
                <Grid item xs={12} style={{width: '100%'}}>
                  <Box
                    color='text.primary'
                    fontWeight={Fonts.BOLD}
                    fontSize={16}
                    component='h4'
                    className={clsx(classes.truncate, classes.titleTruncate)}>
                    {item.name}
                  </Box>
                  <Typography
                    component='h6'
                    color='text.secondary'
                    className={clsx(
                      classes.truncate,
                      classes.textSm,
                      classes.descpMargin,
                    )}>
                    {item.description}
                  </Typography>
                  <Box fontWeight={Fonts.MEDIUM} component='h5'>
                    Version: {item.version}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Box
                      fontWeight={Fonts.MEDIUM}
                      component='h5'
                      className={classes.infoRow}>
                      {Object?.keys(item?.props || {}).length || 'No'} props
                    </Box>
                    <Box
                      fontWeight={Fonts.MEDIUM}
                      component='h5'
                      className={classes.infoRow}>
                      <IconButton
                        aria-label='screenshots'
                        fontSize='small'
                        style={{margin: 5}}
                        className={clsx(classes.button)}>
                        <Icon>{item.icon}</Icon>
                      </IconButton>
                      Screenshots
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}

        {!widgets?.length ? (
          <ListEmptyResult
            content='No matching widgets found. Please relax your filters.'
            loading={loading}
          />
        ) : (
          ''
        )}
      </Grid>
      <SwipeableDrawer
        anchor='right'
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}></SwipeableDrawer>
      {openModal && (
        <AddWidgetModal
          setOpen={setOpenModal}
          open={openModal}
          titleKey={titleKey}
          pageKey={pageKey}
        />
      )}
      {updateProp && (
        <UpdateWidgetModal
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
          updateProp={updateProp}
        />
      )}
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'>
        <DialogTitle id='delete-dialog-title'>{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-dialog-description'>
            Are you sure you want to delete this widget? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color='grey'>
            Cancel
          </Button>
          <Button onClick={handleDeleteWidget} color='secondary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton onClick={() => setOpenModal(true)}>
        <Icon color='secondary' className={classes.Icon}>
          add_circle
        </Icon>
      </IconButton>
    </>
  );
};

export default WidgetsIntegration;
