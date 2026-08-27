import React, {useEffect, useMemo, useState} from 'react';
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
import {addRoute, deleteRoute, fetchLayoutConfig, getRoutesList} from '../../../../redux/actions';
import {FETCH_WARNING} from '../../../../shared/constants/ActionTypes';
import Link from 'next/link';
import {generateSlug} from 'random-word-slugs';
import {getCompanyInfo} from '../../../../redux/actions/AccountAction';
import PreviewModal from '../../../pagesModule/PagesDetail/Preview/Modal';
import {keysFromPattern, buildSample, samplesFromRoute} from './routePattern';
import {formatCreated} from './routeCreated';
import {useRouter} from 'next/router';

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
      borderColor: '#ff9800',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px 10px 0',
    },
  },
  primaryBtn: {
    textTransform: 'none',
    backgroundColor: '#ff9800',
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
  outlineBtn: {
    textTransform: 'none',
    color: '#ff9800',
    border: '1px solid #ff9800',
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 8,
    padding: '7px 16px',
    background: '#fff',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#fff8f0'},
  },
  actionBtn: {
    textTransform: 'none',
    color: '#ff9800',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    minHeight: 0,
    padding: '2px 6px',
    lineHeight: 1.3,
    backgroundColor: 'transparent',
    boxShadow: 'none !important',
    border: 0,
    borderRadius: 6,
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {
      backgroundColor: '#fff8f0',
      boxShadow: 'none !important',
    },
  },
  ghostBtn: {
    textTransform: 'none',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    minHeight: 0,
    padding: '2px 6px',
    lineHeight: 1.3,
    backgroundColor: 'transparent',
    boxShadow: 'none !important',
    border: 0,
    borderRadius: 6,
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {
      backgroundColor: '#fff8f0',
      boxShadow: 'none !important',
    },
  },
  tableGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) 150px 220px',
    gap: 16,
    padding: '10px 8px',
    alignItems: 'center',
  },
  tableHead: {
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    borderBottom: '1px solid #eee',
  },
  sectionBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    margin: '0 -8px 4px',
    background: '#f6f7f9',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 4,
  },
  row: {
    minHeight: 56,
    borderBottom: '1px solid #f3f3f3',
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: '#212121',
    lineHeight: 1.35,
  },
  handle: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.35,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  cell: {
    fontSize: 14,
    color: '#212121',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  mutedCell: {
    fontSize: 14,
    color: '#6b6f76',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 640,
    maxWidth: '92vw',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#212121',
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4px 20px',
    width: '100%',
    '@media (max-width: 560px)': {
      gridTemplateColumns: '1fr',
    },
  },
  fieldWide: {
    gridColumn: '1 / -1',
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#212121',
    marginBottom: 6,
    display: 'block',
  },
  dialogField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      background: '#fff8f0',
      fontFamily: 'Open Sans, sans-serif',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e6e6e6',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff9800',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px',
      fontSize: 14,
    },
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#6b6f76',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  error: {
    fontSize: 14,
    color: '#a8071a',
    margin: '0 0 12px',
  },
}));

const RouteModal = ({open, onClose, editRoute, templates, onSave, classes}) => {
  const [name, setName] = useState('');
  const [pattern, setPattern] = useState('');
  const [pageTemplate, setPageTemplate] = useState('');
  const [params, setParams] = useState({});
  const [error, setError] = useState('');

  const keys = keysFromPattern(pattern);

  useEffect(() => {
    if (!open) {
      return;
    }
    setError('');
    if (editRoute) {
      setName(editRoute.title || '');
      setPattern(editRoute.url_string || '');
      setPageTemplate(editRoute.page_template || '');
      setParams(samplesFromRoute(editRoute));
      return;
    }
    setName('');
    setPattern('');
    setPageTemplate('');
    setParams({});
  }, [open, editRoute]);

  const setPatternAndParams = (nextPattern) => {
    setPattern(nextPattern);
    setParams((prev) => {
      const next = {};
      keysFromPattern(nextPattern).forEach((key) => {
        next[key] = prev[key] || '';
      });
      return next;
    });
  };

  const handleSave = () => {
    if (!name.trim() || !pattern.trim()) {
      setError('Add a name and a URL pattern.');
      return;
    }
    if (!pageTemplate) {
      setError(
        templates.length
          ? 'Pick a page template so shoppers have something to render.'
          : 'No page templates yet. Add one under Page Templates first.',
      );
      return;
    }
    const missingSample = keys.find((key) => !params[key]);
    if (missingSample) {
      setError(`Add a sample value for ${missingSample} so Preview has a real URL.`);
      return;
    }
    onSave({
      _id: editRoute?._id,
      name: name.trim(),
      keys,
      page_template: pageTemplate,
      url: pattern.trim(),
      sample_string: buildSample(pattern.trim(), params),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} classes={{paper: classes.dialogPaper}}>
      <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
        <Typography className={classes.dialogTitle}>
          {editRoute ? 'Edit route' : 'Add route'}
        </Typography>
        <IconButton aria-label='Close' size='small' onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </Box>
      <DialogContent>
        <Typography className={classes.hint}>
          This is the storefront URL. Point it at a page template. Use angle brackets
          for a changing part, like /blog/&lt;slug&gt;.
        </Typography>
        {error ? <Typography className={classes.error}>{error}</Typography> : null}
        <Box className={classes.fields}>
          <Box className={classes.fieldWrap}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='routeName'>
              Name
            </Typography>
            <TextField
              autoFocus
              id='routeName'
              className={classes.dialogField}
              placeholder='Product listing'
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Box>
          <Box className={classes.fieldWrap}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='pageTemplate'>
              Page template
            </Typography>
            <TextField
              id='pageTemplate'
              select
              SelectProps={{native: true}}
              className={classes.dialogField}
              value={pageTemplate}
              onChange={(e) => setPageTemplate(e.target.value)}
              variant='outlined'
              fullWidth>
              <option value=''>
                {templates.length ? 'Choose a template' : 'No templates yet'}
              </option>
              {templates.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box className={`${classes.fieldWrap} ${classes.fieldWide}`}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='routePattern'>
              URL pattern
            </Typography>
            <TextField
              id='routePattern'
              className={classes.dialogField}
              placeholder='/&lt;city&gt;/products'
              value={pattern}
              onChange={(e) => setPatternAndParams(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Box>
          {keys.map((key) => (
            <Box className={classes.fieldWrap} key={key}>
              <Typography className={classes.fieldLabel} component='label' htmlFor={`sample-${key}`}>
                Sample {key}
              </Typography>
              <TextField
                id={`sample-${key}`}
                className={classes.dialogField}
                placeholder='dubai'
                value={params[key] || ''}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                variant='outlined'
                fullWidth
              />
            </Box>
          ))}
        </Box>
        <Box className={classes.dialogFooter}>
          <Button className={classes.outlineBtn} onClick={onClose}>
            Cancel
          </Button>
          <Button className={classes.primaryBtn} onClick={handleSave}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const RoutesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const {routesList = []} = useSelector(({routeList}) => routeList);
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);

  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editRoute, setEditRoute] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [urlToPreview, setUrlToPreview] = useState('');

  useEffect(() => {
    if (typeof router.query?.q === 'string' && router.query.q) {
      setQuery(router.query.q);
    }
  }, [router.query?.q]);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(dispatch(getRoutesList({page: 0, size: 100, quiet: true}))).finally(() => {
      if (!cancelled) {
        setLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!layoutData) {
      dispatch(fetchLayoutConfig());
    }
  }, [dispatch, layoutData]);

  useEffect(() => {
    if (account == null || account == '') {
      dispatch(getCompanyInfo(user?.email));
    }
  }, [account, dispatch, user]);

  const templates = useMemo(() => {
    const config = layoutData?.layoutConfig || {};
    return Object.keys(config).map((key) => ({
      value: key,
      label: config[key]?.meta?.title || key,
    }));
  }, [layoutData]);

  const templateLabel = (key) => {
    const match = templates.find((item) => item.value === key);
    return match?.label || key || '—';
  };

  const needle = query.trim().toLowerCase();
  const visible = useMemo(() => {
    return (routesList || []).filter((route) => {
      if (!needle) {
        return true;
      }
      return `${route.title || ''} ${route.url_string || ''} ${route.page_template || ''} ${
        route.sample_string || ''
      }`
        .toLowerCase()
        .includes(needle);
    });
  }, [routesList, needle]);

  const openAdd = () => {
    setEditRoute(null);
    setOpen(true);
  };

  const openEdit = (route) => {
    setEditRoute(route);
    setOpen(true);
  };

  const handleSave = (payload) => {
    dispatch(addRoute(payload));
  };

  const handlePreview = (route) => {
    const {clientUrl} = account || {};
    if (!clientUrl) {
      dispatch({
        type: FETCH_WARNING,
        payload: 'Add your store URL in Settings → Company first.',
      });
      return;
    }
    let url = route.sample_string || route.url_string || '';
    const slug = generateSlug();
    url = url.replace(/<.*?>/g, slug);
    const slash = url.startsWith('/') || clientUrl.endsWith('/') ? '' : '/';
    setUrlToPreview(`${clientUrl}${slash}${url}`);
    setPreviewOpen(true);
  };

  const handleLayout = (route) => {
    if (!route.page_template) {
      dispatch({
        type: FETCH_WARNING,
        payload: 'Assign a page template to this route first.',
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (routeToDelete?._id) {
      dispatch(deleteRoute(routeToDelete._id));
    }
    setRouteToDelete(null);
    setDeleteOpen(false);
  };

  return (
    <>
      <Box className={classes.page}>
        <Box className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            <TextField
              className={classes.search}
              size='small'
              variant='outlined'
              placeholder='Search routes'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon style={{fontSize: 20, color: '#9ea3a8'}}>search</Icon>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button className={classes.primaryBtn} onClick={openAdd}>
            Add route
          </Button>
        </Box>

        <RouteModal
          open={open}
          onClose={() => setOpen(false)}
          editRoute={editRoute}
          templates={templates}
          onSave={handleSave}
          classes={classes}
        />
        <PreviewModal open={previewOpen} setOpen={setPreviewOpen} urlToPreview={urlToPreview} />

        {!loaded ? (
          <Box className={classes.loader}>
            <CircularProgress style={{color: '#ff9800'}} />
          </Box>
        ) : (
          <>
            <Box className={classes.sectionBar}>Routes {visible.length}</Box>
            <Box className={`${classes.tableGrid} ${classes.tableHead}`}>
              <span>URL</span>
              <span>Template</span>
              <span>Sample</span>
              <span>Created</span>
              <span />
            </Box>
            {visible.length === 0 && (
              <Box className={`${classes.tableGrid} ${classes.row}`}>
                <Typography className={classes.cell} style={{color: '#6b6f76'}}>
                  {needle
                    ? 'No routes match this search.'
                    : 'No routes yet. Add a route to send a page template to a storefront URL.'}
                </Typography>
              </Box>
            )}
            {visible.map((route) => (
              <Box className={`${classes.tableGrid} ${classes.row}`} key={route._id || route.url_string}>
                <Box minWidth={0}>
                  <Typography className={classes.name} noWrap>
                    {route.title || route.url_string}
                  </Typography>
                  <Typography className={classes.handle} noWrap>
                    {route.url_string}
                  </Typography>
                </Box>
                <Typography className={classes.cell}>{templateLabel(route.page_template)}</Typography>
                <Typography className={classes.mutedCell}>
                  {route.sample_string || route.url_string || '—'}
                </Typography>
                <Typography className={classes.mutedCell} title={formatCreated(route)}>
                  {formatCreated(route)}
                </Typography>
                <Box className={classes.actions}>
                  <Button
                    variant='text'
                    disableRipple
                    className={classes.actionBtn}
                    aria-label='Preview'
                    onClick={() => handlePreview(route)}>
                    Preview
                  </Button>
                  {route.page_template ? (
                    <Link href={`/pages/${route.page_template}/layout`} passHref legacyBehavior>
                      <Button
                        variant='text'
                        disableRipple
                        className={classes.actionBtn}
                        aria-label='Layout'>
                        Layout
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant='text'
                      disableRipple
                      className={classes.actionBtn}
                      aria-label='Layout'
                      onClick={() => handleLayout(route)}>
                      Layout
                    </Button>
                  )}
                  <Button
                    variant='text'
                    disableRipple
                    className={classes.actionBtn}
                    aria-label='Edit'
                    onClick={() => openEdit(route)}>
                    Edit
                  </Button>
                  <Button
                    variant='text'
                    disableRipple
                    className={classes.ghostBtn}
                    aria-label='Delete'
                    onClick={() => {
                      setRouteToDelete(route);
                      setDeleteOpen(true);
                    }}>
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </>
        )}

        <Dialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          classes={{paper: classes.dialogPaper}}
          aria-labelledby='delete-route-title'>
          <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
            <Typography className={classes.dialogTitle} id='delete-route-title'>
              Delete route
            </Typography>
            <IconButton
              aria-label='Close'
              size='small'
              onClick={() => setDeleteOpen(false)}>
              <Icon>close</Icon>
            </IconButton>
          </Box>
          <DialogContent>
            <Typography className={classes.hint}>
              This cannot be undone. Shoppers will no longer reach this URL.
            </Typography>
            <Box className={classes.dialogFooter}>
              <Button className={classes.outlineBtn} onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button className={classes.primaryBtn} onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default RoutesList;
