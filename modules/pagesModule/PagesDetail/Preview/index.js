import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {makeStyles} from '@material-ui/core/styles';
import AppHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../../shared/constants/AppEnums';
import PreviewModal from './Modal';
import {getRoutesList, getCompanyInfo} from '../../../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {buildPreviewUrl} from '../../previewUrl';
import {
  SLING_CREAM,
  SLING_INK,
  SLING_ORANGE,
} from '../../../aiBuilder/slingTheme';

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
    maxWidth: 420,
    width: '100%',
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
      padding: '10px 12px',
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
    '&:disabled': {backgroundColor: '#ffcc80', color: '#fff'},
  },
  hint: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.5,
    marginBottom: 16,
    fontFamily: 'Open Sans, sans-serif',
  },
  listRoot: {
    width: '100%',
    padding: 0,
  },
  urlItem: {
    padding: '10px 12px',
    borderRadius: 8,
    background: '#fff',
    border: '1px solid #eee',
    marginBottom: 8,
    boxSizing: 'border-box',
    '&.MuiListItem-button:hover': {background: SLING_CREAM},
  },
  urlItemSelected: {
    background: SLING_CREAM,
    border: '2px solid #ff9800',
    '&.MuiListItem-button:hover': {background: SLING_CREAM},
  },
  urlText: {
    '& .MuiListItemText-primary': {
      fontSize: 14,
      fontWeight: 400,
      color: SLING_INK,
      fontFamily: 'Open Sans, sans-serif',
    },
  },
  urlTextSelected: {
    '& .MuiListItemText-primary': {
      fontSize: 16,
      fontWeight: 600,
      color: SLING_INK,
      fontFamily: 'Open Sans, sans-serif',
    },
  },
  selectedCheck: {
    color: '#ff9800',
    fontSize: 18,
    marginLeft: 8,
    flexShrink: 0,
  },
  empty: {
    fontSize: 14,
    color: '#6b6f76',
    fontFamily: 'Open Sans, sans-serif',
    padding: '24px 4px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
}));

const Preview = ({pageKey}) => {
  const dispatch = useDispatch();
  const {routesList = []} = useSelector(({routeList}) => routeList);
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [urlToPreview, setUrlToPreview] = useState('');
  const [previewMapperDialog, setPreviewMapperDialog] = useState(false);
  const [routesReady, setRoutesReady] = useState(false);

  useEffect(() => {
    if (!account && user?.email) {
      dispatch(getCompanyInfo(user.email));
    }
  }, [dispatch, account, user?.email]);

  useEffect(() => {
    let cancelled = false;
    dispatch(getRoutesList({size: 100, quiet: true})).finally(() => {
      if (!cancelled) setRoutesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const urls = useMemo(() => {
    const {clientUrl} = account || {};
    return (routesList || [])
      .filter((route) => route.page_template === pageKey)
      .map((route) => buildPreviewUrl(route, clientUrl));
  }, [routesList, pageKey, account]);

  const visibleUrls = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return urls;
    return urls.filter((url) => url.toLowerCase().includes(needle));
  }, [urls, query]);

  const loading = !routesReady;

  const handleClick = (item) => {
    setUrlToPreview(item);
  };

  return (
    <>
      <AppHeader>Preview</AppHeader>
      <Box className={classes.page}>
        {loading ? (
          <Box className={classes.loader}>
            <CircularProgress style={{color: SLING_ORANGE}} />
          </Box>
        ) : (
          <>
            <Typography className={classes.hint}>
              These are the live routes that use this template. Pick one and
              click Preview.
            </Typography>
            <Box className={classes.toolbar}>
              <Box className={classes.toolbarLeft}>
                <TextField
                  id='search'
                  placeholder='Search urls'
                  variant='outlined'
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className={classes.search}
                />
              </Box>
              <Button
                className={classes.primaryBtn}
                disabled={!urlToPreview}
                onClick={() => setPreviewMapperDialog(true)}>
                Preview
              </Button>
            </Box>
            {visibleUrls.length === 0 ? (
              <Typography className={classes.empty}>
                {urls.length === 0
                  ? 'This template has no routes yet.'
                  : 'No routes match this search.'}
              </Typography>
            ) : (
              <List className={classes.listRoot}>
                {visibleUrls.map((item) => {
                  const selected = item === urlToPreview;
                  return (
                    <ListItem
                      value={item}
                      key={item}
                      dense
                      button
                      className={`${classes.urlItem}${
                        selected ? ` ${classes.urlItemSelected}` : ''
                      }`}
                      onClick={() => handleClick(item)}>
                      <ListItemText
                        className={
                          selected ? classes.urlTextSelected : classes.urlText
                        }
                        primary={item}
                      />
                      {selected ? (
                        <CheckCircleIcon className={classes.selectedCheck} />
                      ) : null}
                    </ListItem>
                  );
                })}
              </List>
            )}
          </>
        )}
      </Box>
      <PreviewModal
        open={previewMapperDialog}
        setOpen={setPreviewMapperDialog}
        urlToPreview={urlToPreview}
      />
    </>
  );
};

export default Preview;
