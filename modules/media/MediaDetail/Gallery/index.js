import React, {useEffect, useState} from 'react';
import {
  makeStyles,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
} from '@material-ui/core';
import {getMedia, deleteImage} from '../../../../redux/actions';
import {SidebarDrawer} from './SidebarDrawer';
import AddImage from './AddImage';
import {useSelector, useDispatch} from 'react-redux';
import PaginationControlled from '../../../../@sling/core/Pagination';
import {SHOW_MESSAGE} from '../../../../shared/constants/ActionTypes';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';
import MediaThumb from '../../MediaThumb';

const useStyles = makeStyles(() => ({
  page: {
    padding: '12px 28px 32px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
    flex: 1,
  },
  search: {
    maxWidth: 320,
    width: '100%',
    background: '#fff',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      height: 40,
      background: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px 10px 0',
    },
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
  },
  ghostBtn: {
    textTransform: 'none',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '6px 10px',
  },
  copyBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '6px 10px',
  },
  sectionBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    margin: '0 -8px 8px',
    background: '#f6f7f9',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 4,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 16,
  },
  card: {
    border: '1px solid #eee',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  thumbWrap: {
    cursor: 'pointer',
    height: 150,
    background: SLING_CREAM,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cardBody: {
    padding: '12px 12px 8px',
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    lineHeight: 1.35,
    fontFamily: 'Open Sans, sans-serif',
  },
  handle: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.35,
    marginTop: 2,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '0 8px 8px',
    gap: 0,
  },
  empty: {
    padding: '32px 10px',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
  },
  emptyCopy: {
    fontSize: 14,
    color: '#6b6f76',
    marginBottom: 16,
  },
  pager: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 0 0',
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: SLING_ORANGE,
      color: '#fff',
    },
  },
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 420,
    maxWidth: '92vw',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: SLING_INK,
  },
  dialogCopy: {
    fontSize: 14,
    color: '#6b6f76',
    marginTop: 8,
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 24,
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#c62828',
    margin: '8px 0',
  },
}));

const mediaId = (item) => {
  if (!item) return '';
  const raw = item._id || item.id;
  if (!raw) return '';
  if (typeof raw === 'string') return raw;
  return raw.$oid || String(raw);
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const imageName = (item) => item?.title || item?.name || 'Untitled';

const Gallery = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {mediaImages, totalCount} = useSelector(({media}) => media);
  const [filter, setFilter] = useState({page: 0, size: 12, query: ''});
  const [query, setQuery] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imgDetails, setImgDetails] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        await dispatch(getMedia({...filter, quiet: true}));
      } catch (err) {
        if (!cancelled) {
          setError('Could not load images. Try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [dispatch, filter]);

  const runSearch = () => {
    setFilter((prev) => ({...prev, page: 0, query}));
  };

  const toggleDrawer = (value, item) => {
    setOpenDrawer(value);
    setImgDetails(item || {});
  };

  const copyUrl = async (url) => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Image URL copied.',
      });
    } catch (err) {
      setError('Copy failed');
    }
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    dispatch(deleteImage(mediaId(pendingDelete)));
    setPendingDelete(null);
  };

  const images = mediaImages || [];
  const count = totalCount ?? images.length;
  const pageCount = Math.ceil((count || 0) / filter.size);
  const emptyCopy = filter.query
    ? 'No images match this search.'
    : 'No images yet';

  return (
    <>
      <AddImage
        setOpen={setOpenModal}
        open={openModal}
        pageKey='Add New Image'
        titleKey='add-new-image'
      />
      <Box className={classes.page}>
        <Box className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            <TextField
              className={classes.search}
              id='filter-images'
              size='small'
              variant='outlined'
              placeholder='Search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  runSearch();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconButton
                      aria-label='Search'
                      size='small'
                      onClick={runSearch}>
                      <Icon style={{fontSize: 20, color: '#9ea3a8'}}>search</Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button className={classes.primaryBtn} onClick={() => setOpenModal(true)}>
            Upload
          </Button>
        </Box>

        {error && <Typography className={classes.status}>{error}</Typography>}

        {loading ? (
          <Box className={classes.loader}>
            <CircularProgress style={{color: SLING_ORANGE}} />
          </Box>
        ) : (
          <>
            <Box className={classes.sectionBar}>
              {count} {count === 1 ? 'image' : 'images'}
            </Box>
            {images.length === 0 ? (
              <Box className={classes.empty}>
                <Typography className={classes.emptyTitle}>{emptyCopy}</Typography>
                {!filter.query && (
                  <>
                    <Typography className={classes.emptyCopy}>
                      Upload an image to use it on your pages and widgets.
                    </Typography>
                    <Button
                      className={classes.primaryBtn}
                      onClick={() => setOpenModal(true)}>
                      Upload
                    </Button>
                  </>
                )}
              </Box>
            ) : (
              <Box className={classes.grid}>
                {images.map((item) => (
                  <Box className={classes.card} key={mediaId(item) || item.url}>
                    <Box
                      className={classes.thumbWrap}
                      onClick={() => toggleDrawer(true, item)}>
                      <MediaThumb
                        src={item.url}
                        alt={item.alt_text || item.altText || imageName(item)}
                        className={classes.thumb}
                      />
                    </Box>
                    <Box className={classes.cardBody}>
                      <Typography className={classes.name} noWrap>
                        {imageName(item)}
                      </Typography>
                      <Typography className={classes.handle} noWrap>
                        {formatDate(item.added_on || item.updated_on)}
                      </Typography>
                    </Box>
                    <Box className={classes.actions}>
                      <Button
                        className={classes.copyBtn}
                        onClick={() => copyUrl(item.url)}>
                        Copy URL
                      </Button>
                      <Button
                        className={classes.ghostBtn}
                        onClick={() => toggleDrawer(true, item)}>
                        Edit
                      </Button>
                      <Button
                        className={classes.ghostBtn}
                        aria-label='Delete image'
                        onClick={() => setPendingDelete(item)}>
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            {pageCount > 1 && (
              <Box className={classes.pager}>
                <PaginationControlled
                  handleChange={(event, page) => {
                    setFilter({...filter, page: page - 1});
                  }}
                  count={pageCount}
                  page={filter.page + 1}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      <SidebarDrawer
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        details={imgDetails}
      />

      <Dialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        classes={{paper: classes.dialogPaper}}>
        <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
          <Typography className={classes.dialogTitle}>Delete this image?</Typography>
          <IconButton
            aria-label='Close delete'
            size='small'
            onClick={() => setPendingDelete(null)}>
            <Icon>close</Icon>
          </IconButton>
        </Box>
        <DialogContent>
          <Typography className={classes.dialogCopy}>
            This cannot be undone. Pages using this file will keep a broken URL.
          </Typography>
          <Box className={classes.dialogFooter}>
            <Button className={classes.ghostBtn} onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button className={classes.primaryBtn} onClick={confirmDelete}>
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
