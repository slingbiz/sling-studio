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
import {makeStyles} from '@material-ui/core/styles';
import AppHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../../shared/constants/AppEnums';
import PreviewModal from './Modal';
import {getRoutesList, getCompanyInfo} from '../../../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {generateSlug} from 'random-word-slugs';
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
    padding: '8px 4px',
    borderRadius: 8,
    '&:hover': {background: SLING_CREAM},
  },
  urlItemSelected: {
    background: SLING_CREAM,
  },
  urlText: {
    '& .MuiListItemText-primary': {
      fontSize: 14,
      color: SLING_INK,
      fontFamily: 'Open Sans, sans-serif',
    },
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

const buildPreviewUrl = (route, clientUrl) => {
  let url = route.sample_string || route.url_string || '';
  url = url.replace(/\<.*?\>/g, () =>
    generateSlug(1, {
      format: 'lower',
      partsOfSpeech: ['noun'],
    }),
  );
  const base = clientUrl || '';
  const slash = url.startsWith('/') || base.endsWith('/') ? '' : '/';
  return `${base}${slash}${url}`;
};

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
    dispatch(getRoutesList({size: 100})).finally(() => {
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
                {visibleUrls.map((item) => (
                  <ListItem
                    value={item}
                    key={item}
                    dense
                    button
                    className={`${classes.urlItem}${
                      item === urlToPreview ? ` ${classes.urlItemSelected}` : ''
                    }`}
                    onClick={() => handleClick(item)}>
                    <ListItemText className={classes.urlText} primary={item} />
                  </ListItem>
                ))}
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
