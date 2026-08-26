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
import {
  deletePageTemplateAction,
  getRoutesList,
  setLayoutConfig,
} from '../../../redux/actions';
import {getCompanyInfo} from '../../../redux/actions/AccountAction';
import {LivePreviewGate, TemplateTilePreview} from './TemplateTilePreview';
import {buildPreviewUrl} from '../previewUrl';
import {FETCH_ERROR} from '../../../shared/constants/ActionTypes';
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme) => ({
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
  count: {
    fontSize: 14,
    color: '#6b6f76',
    whiteSpace: 'nowrap',
    fontFamily: 'Open Sans, sans-serif',
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
    boxShadow: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#fff8f0', boxShadow: 'none'},
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gap: 20,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    },
  },
  card: {
    border: '1px solid #eee',
    borderRadius: 12,
    overflow: 'hidden',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    position: 'relative',
    '&:hover': {borderColor: '#ffcc80'},
    '&:hover $deleteIcon, &:hover $actionBtn, &:hover $configureBtn, &:focus-within $deleteIcon, &:focus-within $actionBtn, &:focus-within $configureBtn': {
      opacity: 1,
      pointerEvents: 'auto',
    },
    '@media (hover: none)': {
      '& $deleteIcon, & $actionBtn, & $configureBtn': {
        opacity: 1,
        pointerEvents: 'auto',
      },
    },
  },
  cardBody: {
    padding: '14px 16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: '#163a5f',
    lineHeight: 1.35,
  },
  pathCode: {
    display: 'block',
    background: '#fff8f0',
    border: '1px solid #eee',
    borderRadius: 6,
    padding: '4px 8px',
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: 13,
    color: '#6b6f76',
    lineHeight: 1.4,
    wordBreak: 'break-word',
  },
  pathToken: {
    color: '#163a5f',
    fontWeight: 500,
  },
  pathEmpty: {
    display: 'block',
    background: '#fff8f0',
    border: '1px solid #eee',
    borderRadius: 6,
    padding: '4px 8px',
    fontSize: 13,
    color: '#6b6f76',
    lineHeight: 1.4,
    fontFamily: 'Open Sans, sans-serif',
  },
  desc: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.4,
    marginTop: 2,
  },
  mutedCell: {
    fontSize: 14,
    color: '#6b6f76',
  },
  emptyGrid: {
    gridColumn: '1 / -1',
    padding: '24px 8px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    padding: '0 16px 14px',
  },
  actionBtn: {
    textTransform: 'none',
    color: '#ff9800',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 72,
    minHeight: 40,
    padding: '8px 18px',
    lineHeight: 1.3,
    borderRadius: 8,
    backgroundColor: '#fff',
    boxShadow: 'none !important',
    border: '1px solid #ff9800',
    opacity: 0,
    pointerEvents: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#fff8f0', boxShadow: 'none !important'},
  },
  configureBtn: {
    textTransform: 'none',
    backgroundColor: '#ff9800',
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    minWidth: 72,
    minHeight: 40,
    padding: '8px 18px',
    borderRadius: 8,
    boxShadow: 'none',
    opacity: 0,
    pointerEvents: 'none',
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 3,
    width: 32,
    height: 32,
    padding: 0,
    backgroundColor: '#fff',
    border: '1px solid #eee',
    color: '#6b6f76',
    boxShadow: 'none',
    opacity: 0,
    pointerEvents: 'none',
    '&:hover': {backgroundColor: '#fff8f0', color: '#ff9800'},
    '& .MuiIcon-root': {fontSize: 18},
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
    color: '#163a5f',
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
    color: '#163a5f',
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
    '& .MuiOutlinedInput-root.Mui-disabled': {
      background: '#f4f5f8',
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
}));

const ModalPageTemplate = ({
  setOpen,
  open,
  edit,
  addPageTemplate,
  classes,
  currentTemplate = {},
}) => {
  const {
    description: descriptionInit,
    templateKey: templateKeyInit,
    title: titleInit,
  } = edit ? currentTemplate : {};
  const [templateKey, setTemplateKey] = useState(templateKeyInit);
  const [title, setTitle] = useState(titleInit);
  const [description, setDescription] = useState(descriptionInit);

  useEffect(() => {
    setTemplateKey(templateKeyInit);
    setTitle(titleInit);
    setDescription(descriptionInit);
  }, [templateKeyInit, descriptionInit, titleInit]);

  const close = () => {
    setOpen(false);
    setTemplateKey('');
    setTitle('');
    setDescription('');
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      classes={{paper: classes.dialogPaper}}>
      <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
        <Typography className={classes.dialogTitle}>
          {edit ? 'Edit template' : 'Add template'}
        </Typography>
        <IconButton aria-label='Close' size='small' onClick={close}>
          <Icon>close</Icon>
        </IconButton>
      </Box>
      <DialogContent>
        <Typography className={classes.hint}>
          {edit
            ? 'Routes already use this id. You can change the title or description.'
            : 'Give it a unique id. Routes that use this template will point at that id.'}
        </Typography>
        <Box className={classes.fields}>
          <Box className={classes.fieldWrap}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='templateId'>
              Unique id
            </Typography>
            <TextField
              autoFocus={!edit}
              id='templateId'
              className={classes.dialogField}
              placeholder='newyear-sale'
              value={templateKey || ''}
              disabled={edit}
              onChange={(e) => {
                const modifiedKey = e.target.value
                  .replace(/[\W_-]/g, '-')
                  .replace(/-+/g, '-');
                setTemplateKey(modifiedKey.toLowerCase());
              }}
              variant='outlined'
              fullWidth
            />
          </Box>
          <Box className={classes.fieldWrap}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='title'>
              Title
            </Typography>
            <TextField
              id='title'
              className={classes.dialogField}
              placeholder='New Year sale'
              value={title || ''}
              autoFocus={edit}
              onChange={(e) => setTitle(e.target.value)}
              variant='outlined'
              fullWidth
            />
          </Box>
          <Box className={`${classes.fieldWrap} ${classes.fieldWide}`}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='description'>
              Description
            </Typography>
            <TextField
              id='description'
              className={classes.dialogField}
              placeholder='Promotional landing pages from Christmas to New Year'
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
              variant='outlined'
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </Box>
        <Box className={classes.dialogFooter}>
          <Button className={classes.outlineBtn} onClick={close}>
            Cancel
          </Button>
          <Button
            className={classes.primaryBtn}
            disabled={!String(templateKey || '').trim() || !String(title || '').trim()}
            onClick={() => addPageTemplate(templateKey, {title, description})}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const renderRoutePattern = (path, classes) => {
  const chunks = String(path)
    .split(/(<[^>]+>)/g)
    .filter(Boolean);
  return chunks.map((chunk, i) =>
    chunk.startsWith('<') && chunk.endsWith('>') ? (
      <span key={i} className={classes.pathToken}>
        {chunk}
      </span>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  );
};

const PageTemplatesList = () => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const loading = !layoutData;
  const {layoutConfig = {}} = layoutData || {};
  const {routesList = []} = useSelector(({routeList}) => routeList);
  const {account} = useSelector(({account}) => account);
  const {user} = useSelector(({auth}) => auth);
  const clientUrl = account?.clientUrl;

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!account && user?.email) {
      dispatch(getCompanyInfo(user.email));
    }
  }, [dispatch, account, user?.email]);

  useEffect(() => {
    if (!routesList.length) {
      dispatch(getRoutesList({size: 100, quiet: true}));
    }
  }, [dispatch, routesList.length]);

  const addPageTemplate = (pageKey, meta) => {
    if (!pageKey || !meta?.title) {
      dispatch({
        type: FETCH_ERROR,
        payload: 'Add an id and a title.',
      });
      return;
    }
    setOpen(false);
    const rootObj = !edit ? {root: {header: {}, body: {}, footer: {}}} : {};
    dispatch(setLayoutConfig({pageKey, meta, isNewRecord: !edit, ...rootObj}));
  };

  const handleDeleteConfirm = () => {
    if (!allowDelete) {
      return;
    }
    if (templateToDelete) {
      dispatch(deletePageTemplateAction({pageKey: templateToDelete}));
      setTemplateToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const deletePageTemplate = (pageKey) => {
    setTemplateToDelete(pageKey);
    setDeleteDialogOpen(true);
  };

  const search = typeof window !== 'undefined' ? window.location.search : '';
  const params = new URLSearchParams(search);
  const isAdmin = params.get('isAdmin');
  const allowDelete =
    isAdmin || process.env.NEXT_PUBLIC_DISABLE_DELETE !== 'true';

  const firstRouteByTemplate = useMemo(() => {
    const map = {};
    (routesList || []).forEach((route) => {
      const key = route.page_template;
      if (key && !map[key]) {
        map[key] = route;
      }
    });
    return map;
  }, [routesList]);

  const handleTemplateClick = (templateKey) => {
    router.push(`/pages/${templateKey}/layout`);
  };

  const needle = query.trim().toLowerCase();
  const visibleKeys = useMemo(() => {
    return Object.keys(layoutConfig)
      .reverse()
      .filter((key) => {
        if (!needle) return true;
        const meta = layoutConfig[key]?.meta || {};
        return `${key} ${meta.title || ''} ${meta.description || ''}`
          .toLowerCase()
          .includes(needle);
      });
  }, [layoutConfig, needle]);

  return (
    <>
      <Box className={classes.page}>
        <Box className={classes.toolbar}>
          <Box className={classes.toolbarLeft}>
            <TextField
              className={classes.search}
              size='small'
              variant='outlined'
              placeholder='Search templates'
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
            {!loading ? (
              <Typography className={classes.count}>
                {visibleKeys.length}{' '}
                {visibleKeys.length === 1 ? 'template' : 'templates'}
              </Typography>
            ) : null}
          </Box>
          <Button
            className={classes.primaryBtn}
            onClick={() => {
              setCurrentTemplate({});
              setEdit(false);
              setOpen(true);
            }}>
            Add template
          </Button>
        </Box>

        <ModalPageTemplate
          edit={edit}
          currentTemplate={currentTemplate}
          open={open}
          classes={classes}
          setOpen={setOpen}
          addPageTemplate={addPageTemplate}
        />

        {loading ? (
          <Box className={classes.loader}>
            <CircularProgress style={{color: '#ff9800'}} />
          </Box>
        ) : (
          <LivePreviewGate>
              <Box className={classes.grid}>
                {visibleKeys.length === 0 && (
                  <Box className={classes.emptyGrid}>
                    <Typography className={classes.mutedCell}>
                      {needle
                        ? 'No templates match this search.'
                        : 'No page templates yet. Add a template to get started.'}
                    </Typography>
                  </Box>
                )}
                {visibleKeys.map((templateKey) => {
                  const {meta} = layoutConfig[templateKey] || {};
                  const {title, description} = meta || {};
                  const route = firstRouteByTemplate[templateKey];
                  const previewUrl = buildPreviewUrl(route, clientUrl);
                  const pathLabel = route
                    ? route.url_string || route.sample_string
                    : 'No route yet';
                  const emptyHint = route
                    ? 'Add your store URL in Settings → Company first.'
                    : 'Assign a route to see this page on the storefront.';
                  return (
                    <Box
                      className={classes.card}
                      key={templateKey}
                      onClick={() => handleTemplateClick(templateKey)}>
                      <IconButton
                        className={classes.deleteIcon}
                        aria-label='Delete'
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePageTemplate(templateKey);
                        }}>
                        <Icon>delete_outline</Icon>
                      </IconButton>
                      <TemplateTilePreview
                        id={templateKey}
                        previewUrl={previewUrl}
                        emptyHint={emptyHint}
                      />
                      <Box className={classes.cardBody}>
                        <Typography className={classes.name} noWrap>
                          {title || templateKey}
                        </Typography>
                        {route ? (
                          <Typography
                            className={classes.pathCode}
                            component='code'
                            title={pathLabel}>
                            {renderRoutePattern(pathLabel, classes)}
                          </Typography>
                        ) : (
                          <Typography className={classes.pathEmpty}>
                            No route yet
                          </Typography>
                        )}
                        {description ? (
                          <Typography className={classes.desc} noWrap>
                            {description}
                          </Typography>
                        ) : null}
                      </Box>
                      <Box
                        className={classes.cardActions}
                        onClick={(e) => e.stopPropagation()}>
                        <Button
                          className={classes.actionBtn}
                          aria-label='Edit'
                          onClick={() => {
                            setCurrentTemplate({
                              templateKey,
                              title,
                              description,
                            });
                            setEdit(true);
                            setOpen(true);
                          }}>
                          Edit
                        </Button>
                        <Button
                          className={classes.configureBtn}
                          aria-label='Configure'
                          onClick={() =>
                            router.push(
                              `/pages/${templateKey}/layout?edit=1`,
                            )
                          }>
                          Configure
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </LivePreviewGate>
        )}

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          classes={{paper: classes.dialogPaper}}
          aria-labelledby='delete-dialog-title'>
          <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
            <Typography className={classes.dialogTitle} id='delete-dialog-title'>
              Delete template
            </Typography>
            <IconButton
              aria-label='Close'
              size='small'
              onClick={() => setDeleteDialogOpen(false)}>
              <Icon>close</Icon>
            </IconButton>
          </Box>
          <DialogContent>
            <Typography className={classes.hint}>
              This cannot be undone. Routes using this template will lose it.
            </Typography>
            <Box className={classes.dialogFooter}>
              <Button
                className={classes.outlineBtn}
                onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className={classes.primaryBtn}
                onClick={handleDeleteConfirm}
                disabled={!allowDelete}>
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default PageTemplatesList;
