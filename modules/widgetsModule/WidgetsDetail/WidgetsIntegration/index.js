import React, {useContext, useEffect, useRef, useState} from 'react';
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
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {Edit} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ListEmptyResult from '../../../../@sling/core/AppList/ListEmptyResult';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import AddWidgetModal from './AddWidgetModal';
import UpdateWidgetModal from './AddWidgetModal';
import {useRouter} from 'next/router';
import AppContext from '../../../../@sling/utility/AppContext';
import SandboxedPreview from '../../../aiBuilder/components/SandboxedPreview';
import {resolveWidgetTheme} from '../../../aiBuilder/widgetTheme';
import {SLING_ORANGE} from '../../../aiBuilder/slingTheme';

const STATUS_FILTERS = [
  {label: 'Published', value: 'published'},
  {label: 'Draft', value: 'draft'},
];

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
  widgetCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  previewSlot: {
    position: 'relative',
    height: 150,
    minHeight: 150,
    maxHeight: 150,
    width: '100%',
    flexShrink: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    border: '1px solid #f0e6d8',
    borderRadius: 6,
  },
  cardMeta: {
    width: '100%',
    minHeight: 0,
    paddingTop: 8,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    cursor: 'pointer',
  },
  noImgContainer: {
    cursor: 'pointer',
  },
  livePreview: {
    width: '100%',
    height: 150,
    pointerEvents: 'none',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  emptyPreview: {
    width: '100%',
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b0b0b0',
    fontSize: 12,
    backgroundColor: '#fafafa',
  },
  titleTruncate: {
    padding: '8px 0 4px 0',
    minHeight: 48,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  descriptionClamp: {
    minHeight: 40,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
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
  statusFilters: {
    display: 'flex',
    gap: 8,
    marginRight: 12,
  },
  statusChip: {
    textTransform: 'none',
  },
  statusChipActive: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f57c00',
    },
  },
}));

const WidgetsIntegration = (props) => {
  const {titleKey, pageKey} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {theme} = useContext(AppContext);
  const tenantTheme = resolveWidgetTheme(theme);
  const {widgets, totalCount} = useSelector(({widgets}) => widgets);
  const [filter, setFilter] = useState({status: 'published'});
  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Manage delete confirmation dialog
  const [widgetToDelete, setWidgetToDelete] = useState(null); // Manage widget to delete
  const loading = useSelector(({common}) => common.loading);
  const [updateProp, setupdateProp] = useState(null);
  const [hoveredWidget, setHoveredWidget] = useState(null); // Track the hovered widget
  const sentinelRef = useRef(null);
  const pageRef = useRef(0);
  const fetchingMoreRef = useRef(false);

  useEffect(() => {
    pageRef.current = 0;
    fetchingMoreRef.current = true;
    dispatch(getWidgets({...filter, page: 0, size: 8}));
  }, [filter]);

  useEffect(() => {
    fetchingMoreRef.current = false;
  }, [widgets]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) {
        return;
      }
      if (fetchingMoreRef.current) {
        return;
      }
      if (!widgets?.length || widgets.length >= (totalCount || 0)) {
        return;
      }
      fetchingMoreRef.current = true;
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      dispatch(getWidgets({...filter, page: nextPage, size: 8, append: true}));
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [dispatch, filter, widgets, totalCount]);

  const setStatusFilter = (status) => {
    setFilter((prev) => ({...prev, status}));
  };

  const toggleDrawer = (value, item) => {
    setOpenDrawer(value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setFilter({...filter, query: event.target.value});
    }
  };

  const handleDeleteWidget = () => {
    if (widgetToDelete) {
      dispatch(deleteWidget(widgetToDelete, {status: filter.status}));
      pageRef.current = 0;
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
          Widgets
        </Box>
        <Box style={{display: 'flex', alignItems: 'center'}}>
          <Box className={classes.statusFilters}>
            {STATUS_FILTERS.map((option) => (
              <Chip
                key={option.value}
                size='small'
                label={option.label}
                aria-label={`Show ${option.label} widgets`}
                className={
                  filter.status === option.value ? classes.statusChipActive : classes.statusChip
                }
                onClick={() => setStatusFilter(option.value)}
                color={filter.status === option.value ? 'primary' : 'default'}
                variant={filter.status === option.value ? 'default' : 'outlined'}
              />
            ))}
          </Box>
          <Tooltip title='Generate with AI'>
            <IconButton onClick={() => router.push('/widgets/ai-generate')}>
              <Icon
                className={classes.iconDefault}
                aria-label={'Generate with AI'}
                style={{color: '#ff9800'}}>
                auto_awesome
              </Icon>
            </IconButton>
          </Tooltip>
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
        alignItems='stretch'
        className={classes.gridPadding}
        spacing={5}
        style={{padding: 20}}>
        {widgets?.map((item, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={item._id || index}
            onMouseEnter={() => setHoveredWidget(item._id)}
            onMouseLeave={() => setHoveredWidget(null)}>
            <Box className={classes.widgetCard}>
              <Box className={classes.previewSlot}>
                {hoveredWidget === item._id && (
                  <>
                    <IconButton
                      onClick={() => {
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
                      onClick={() => handleDelete(item._id)}
                      style={{position: 'absolute', top: 4, right: 4, zIndex: 2}}>
                      <Icon color='grey'>delete</Icon>
                    </IconButton>
                  </>
                )}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className={classes.itemImage}
                    onClick={() => toggleDrawer(true, item)}
                  />
                ) : item.code ? (
                  <SandboxedPreview
                    code={item.code}
                    dependencies={item.dependencies}
                    themeOverrides={tenantTheme}
                    style={{height: 148}}
                  />
                ) : (
                  <Box className={classes.emptyPreview}>No live preview</Box>
                )}
              </Box>
              <Box className={classes.cardMeta}>
                <Box
                  color='text.primary'
                  fontWeight={Fonts.BOLD}
                  fontSize={16}
                  component='h4'
                  className={classes.titleTruncate}>
                  {item.name}
                  {item.source === 'ai_generated' && (
                    <Chip
                      size='small'
                      label='AI'
                      color='primary'
                      style={{marginLeft: 4, height: 20, fontSize: 10}}
                    />
                  )}
                  {item.status && (
                    <Chip
                      size='small'
                      label={item.status.replace('_', ' ')}
                      variant='outlined'
                      style={{marginLeft: 4, height: 20, fontSize: 10}}
                      color={item.status === 'published' ? 'primary' : 'default'}
                    />
                  )}
                </Box>
                <Typography
                  component='h6'
                  color='text.secondary'
                  className={clsx(classes.descriptionClamp, classes.descpMargin)}>
                  {item.description}
                </Typography>
                <Box fontWeight={Fonts.MEDIUM} component='h5'>
                  Version: {item.version || 1}
                </Box>
                <Box className={classes.cardFooter}>
                  <Box fontWeight={Fonts.MEDIUM} component='h5' className={classes.infoRow}>
                    {Object?.keys(item?.props || {}).length || 'No'} props
                  </Box>
                  <Box fontWeight={Fonts.MEDIUM} component='h5' className={classes.infoRow}>
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
              </Box>
            </Box>
          </Grid>
        ))}

        {!loading && !widgets?.length ? (
          <ListEmptyResult
            content='No matching widgets found. Please relax your filters.'
          />
        ) : (
          ''
        )}
        <div ref={sentinelRef} />
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
