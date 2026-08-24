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
import AppsHeader from '../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useDispatch, useSelector} from 'react-redux';
import {
  deletePageTemplateAction,
  getRoutesList,
  setLayoutConfig,
} from '../../../redux/actions';
import {FETCH_ERROR} from '../../../shared/constants/ActionTypes';
import Link from 'next/link';
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
    padding: '6px 10px',
    fontFamily: 'Open Sans, sans-serif',
  },
  ghostBtn: {
    textTransform: 'none',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
    minWidth: 0,
    padding: '6px 10px',
    fontFamily: 'Open Sans, sans-serif',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 1.6fr) minmax(180px, 1.5fr) 90px auto',
    gap: 12,
    padding: '12px 8px 10px',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
  },
  sectionBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    margin: '0 -8px 0',
    background: '#f6f7f9',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 4,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 1.6fr) minmax(180px, 1.5fr) 90px auto',
    gap: 12,
    alignItems: 'center',
    padding: '12px 8px',
    minHeight: 60,
    cursor: 'pointer',
    '&:hover': {background: '#fff8f0'},
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: 'cover',
    background: '#fff8f0',
    flexShrink: 0,
    border: '1px solid #eee',
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
          Give it a unique id. Routes that use this template will point at that id.
        </Typography>
        <Box className={classes.fields}>
          <Box className={classes.fieldWrap}>
            <Typography className={classes.fieldLabel} component='label' htmlFor='templateId'>
              Unique ID
            </Typography>
            <TextField
              autoFocus
              id='templateId'
              className={classes.dialogField}
              placeholder='newyear-sale'
              value={templateKey || ''}
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
            onClick={() => addPageTemplate(templateKey, {title, description})}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
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

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!routesList.length) {
      dispatch(getRoutesList({size: 100}));
    }
  }, [dispatch, routesList.length]);

  const addPageTemplate = (pageKey, meta) => {
    if (!pageKey || !meta?.title || !meta?.description) {
      dispatch({
        type: FETCH_ERROR,
        payload: 'Please add valid values for the new template',
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

  const getPreviewUrlsCount = (templateKey) => {
    if (!routesList?.length) return 0;
    return routesList.filter((route) => route.page_template === templateKey)
      .length;
  };

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
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Page templates
        </Box>
      </AppsHeader>
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
          <>
            <Box className={classes.tableHead}>
              <span>Template</span>
              <span>Description</span>
              <span>URLs</span>
              <span />
            </Box>
            <Box className={classes.sectionBar}>
              Templates {visibleKeys.length}
            </Box>
            {visibleKeys.length === 0 && (
              <Box className={classes.row} style={{cursor: 'default'}}>
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
              const urlCount = getPreviewUrlsCount(templateKey);
              return (
                <Box
                  className={classes.row}
                  key={templateKey}
                  onClick={() => handleTemplateClick(templateKey)}>
                  <Box className={classes.nameCell}>
                    <img
                      className={classes.thumb}
                      src={
                        meta?.preview_image ||
                        '/images/cards/pagelayout_default.png'
                      }
                      alt=''
                    />
                    <Box minWidth={0}>
                      <Typography className={classes.name} noWrap>
                        {title || templateKey}
                      </Typography>
                      <Typography className={classes.handle} noWrap>
                        {templateKey}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography className={classes.cell}>
                    {description || '—'}
                  </Typography>
                  <Typography className={classes.mutedCell}>{urlCount}</Typography>
                  <Box className={classes.actions} onClick={(e) => e.stopPropagation()}>
                    <Link href={`/pages/${templateKey}/layout`} passHref legacyBehavior>
                      <Button className={classes.actionBtn} aria-label='Configure'>
                        Configure
                      </Button>
                    </Link>
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
                      className={classes.ghostBtn}
                      aria-label='Delete'
                      onClick={() => deletePageTemplate(templateKey)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </>
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
