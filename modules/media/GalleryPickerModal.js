import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {getMedia} from '../../redux/actions';
import {SHOW_MESSAGE} from '../../shared/constants/ActionTypes';
import PaginationControlled from '../../@sling/core/Pagination';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../aiBuilder/slingTheme';
import AddImage from './MediaDetail/Gallery/AddImage';
import MediaThumb from './MediaThumb';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 720,
    maxWidth: '92vw',
    fontFamily: 'Open Sans, sans-serif',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: SLING_INK,
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
      background: SLING_CREAM,
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: SLING_ORANGE,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px 10px 0',
      fontSize: 14,
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
  copyBtn: {
    textTransform: 'none',
    color: SLING_ORANGE,
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '6px 10px',
    fontFamily: 'Open Sans, sans-serif',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 12,
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
    height: 120,
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
    padding: '10px 10px 6px',
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    lineHeight: 1.35,
    fontFamily: 'Open Sans, sans-serif',
  },
  empty: {
    padding: '32px 10px',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    fontFamily: 'Open Sans, sans-serif',
  },
  emptyCopy: {
    fontSize: 14,
    color: '#6b6f76',
    marginBottom: 16,
    fontFamily: 'Open Sans, sans-serif',
  },
  pager: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 0 0',
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: SLING_ORANGE,
      color: '#fff',
    },
  },
  status: {
    fontSize: 14,
    color: '#c62828',
    margin: '8px 0',
  },
  hint: {
    fontSize: 14,
    color: '#6b6f76',
    marginBottom: 12,
    fontFamily: 'Open Sans, sans-serif',
  },
}));

const mediaId = (item) => {
  if (!item) return '';
  const raw = item._id || item.id;
  if (!raw) return '';
  if (typeof raw === 'string') return raw;
  return raw.$oid || String(raw);
};

const imageName = (item) => item?.title || item?.name || 'Untitled';

const GalleryPickerModal = ({open, onClose, onSelect}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {mediaImages, totalCount} = useSelector(({media}) => media);
  const [filter, setFilter] = useState({page: 0, size: 12, query: ''});
  const [query, setQuery] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
      setFilter({page: 0, size: 12, query: ''});
      setError('');
      setUploadOpen(false);
      return undefined;
    }
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
  }, [dispatch, filter, open]);

  const runSearch = () => {
    setFilter((prev) => ({...prev, page: 0, query}));
  };

  const pick = (item) => {
    const url = item?.url;
    if (!url) return;
    onSelect?.(url);
    onClose?.();
  };

  const copyUrl = async (event, url) => {
    event.stopPropagation();
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

  const images = mediaImages || [];
  const count = totalCount ?? images.length;
  const pageCount = Math.ceil((count || 0) / filter.size);
  const emptyCopy = filter.query ? 'No images match this search.' : 'No images yet';

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        disableEnforceFocus
        classes={{paper: classes.dialogPaper}}
        aria-labelledby='gallery-picker-title'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={2}
          pt={1}>
          <Typography id='gallery-picker-title' className={classes.dialogTitle}>
            Pick from gallery
          </Typography>
          <IconButton aria-label='Close gallery picker' size='small' onClick={onClose}>
            <Icon>close</Icon>
          </IconButton>
        </Box>
        <DialogContent>
          <Typography className={classes.hint}>
            Click an image to use its URL on this prop.
          </Typography>
          <Box className={classes.toolbar}>
            <Box className={classes.toolbarLeft}>
              <TextField
                className={classes.search}
                id='gallery-picker-search'
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
                        <Icon style={{fontSize: 20, color: '#9ea3a8'}}>
                          search
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              className={classes.primaryBtn}
              onClick={() => setUploadOpen(true)}>
              Upload
            </Button>
          </Box>

          {error && <Typography className={classes.status}>{error}</Typography>}

          {loading ? (
            <Box className={classes.loader}>
              <CircularProgress style={{color: SLING_ORANGE}} />
            </Box>
          ) : images.length === 0 ? (
            <Box className={classes.empty}>
              <Typography className={classes.emptyTitle}>{emptyCopy}</Typography>
              {!filter.query && (
                <>
                  <Typography className={classes.emptyCopy}>
                    Upload an image to use it on this prop.
                  </Typography>
                  <Button
                    className={classes.primaryBtn}
                    onClick={() => setUploadOpen(true)}>
                    Upload
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <>
              <Box className={classes.grid}>
                {images.map((item) => (
                  <Box className={classes.card} key={mediaId(item) || item.url}>
                    <Box
                      className={classes.thumbWrap}
                      role='button'
                      tabIndex={0}
                      aria-label={`Select ${imageName(item)}`}
                      onClick={() => pick(item)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          pick(item);
                        }
                      }}>
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
                    </Box>
                    <Button
                      className={classes.copyBtn}
                      onClick={(event) => copyUrl(event, item.url)}>
                      Copy URL
                    </Button>
                  </Box>
                ))}
              </Box>
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
        </DialogContent>
      </Dialog>
      <AddImage
        setOpen={setUploadOpen}
        open={uploadOpen}
        pageKey='Add New Image'
        titleKey='add-new-image'
      />
    </>
  );
};

export default GalleryPickerModal;
