import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useDispatch, useSelector} from 'react-redux';
import {setLayoutConfig} from '../../../../redux/actions';
import {FETCH_ERROR} from '../../../../shared/constants/ActionTypes';
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
  sectionHead: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    lineHeight: 1.35,
    fontFamily: 'Open Sans, sans-serif',
  },
  sectionHint: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.5,
    marginTop: 6,
    maxWidth: 640,
    fontFamily: 'Open Sans, sans-serif',
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4px 20px',
    width: '100%',
    '@media (max-width: 720px)': {
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
    color: SLING_INK,
    marginBottom: 6,
    display: 'block',
    fontFamily: 'Open Sans, sans-serif',
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
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
    '& .MuiOutlinedInput-root.Mui-disabled': {
      background: SLING_CREAM,
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input': {
      color: SLING_INK,
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
    flexShrink: 0,
    fontFamily: 'Open Sans, sans-serif',
    '&:hover': {backgroundColor: '#f57c00', boxShadow: 'none'},
    '&:disabled': {backgroundColor: '#ffcc80', color: '#fff'},
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: 48,
  },
  empty: {
    fontSize: 14,
    color: '#6b6f76',
    fontFamily: 'Open Sans, sans-serif',
    padding: '24px 0',
  },
}));

const Basic = ({pageKey}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);
  const loading = !layoutData;
  const {layoutConfig = {}} = layoutData || {};
  const template = layoutConfig[pageKey];
  const meta = template?.meta || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(meta.title || '');
    setDescription(meta.description || '');
  }, [meta.title, meta.description]);

  const handleSave = () => {
    const nextTitle = title.trim();
    const nextDescription = description.trim();
    if (!nextTitle || !nextDescription) {
      dispatch({
        type: FETCH_ERROR,
        payload: 'Add a title and description before saving.',
      });
      return;
    }
    setSaving(true);
    dispatch(
      setLayoutConfig({
        pageKey,
        meta: {
          ...meta,
          title: nextTitle,
          description: nextDescription,
        },
      }),
    );
    setSaving(false);
  };

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          Page details
        </Box>
      </AppsHeader>
      <Box className={classes.page}>
        {loading ? (
          <Box className={classes.loader}>
            <CircularProgress style={{color: SLING_ORANGE}} />
          </Box>
        ) : !template ? (
          <Typography className={classes.empty}>
            This template could not be found. Go back to Pages and pick it from
            the list.
          </Typography>
        ) : (
          <>
            <Box className={classes.sectionHead}>
              <Box>
                <Typography className={classes.sectionTitle}>
                  Title and description
                </Typography>
                <Typography className={classes.sectionHint}>
                  These show up on the templates list. The page key stays the
                  same so existing routes keep working.
                </Typography>
              </Box>
              <Box className={classes.actions}>
                <Button
                  className={classes.primaryBtn}
                  onClick={handleSave}
                  disabled={saving}>
                  Save
                </Button>
              </Box>
            </Box>
            <Box className={classes.fields}>
              <Box className={classes.fieldWrap}>
                <Typography
                  className={classes.fieldLabel}
                  component='label'
                  htmlFor='pageKey'>
                  Page name
                </Typography>
                <TextField
                  id='pageKey'
                  value={pageKey || ''}
                  variant='outlined'
                  fullWidth
                  disabled
                  className={classes.field}
                />
              </Box>
              <Box className={classes.fieldWrap}>
                <Typography
                  className={classes.fieldLabel}
                  component='label'
                  htmlFor='title'>
                  Title
                </Typography>
                <TextField
                  id='title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  variant='outlined'
                  fullWidth
                  className={classes.field}
                />
              </Box>
              <Box className={`${classes.fieldWrap} ${classes.fieldWide}`}>
                <Typography
                  className={classes.fieldLabel}
                  component='label'
                  htmlFor='description'>
                  Description
                </Typography>
                <TextField
                  id='description'
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  variant='outlined'
                  fullWidth
                  multiline
                  minRows={3}
                  className={classes.field}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Basic;
