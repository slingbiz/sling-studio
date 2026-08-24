import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Typography,
  Icon,
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {updateImage} from '../../../../redux/actions';
import {SHOW_MESSAGE} from '../../../../shared/constants/ActionTypes';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    borderRadius: 12,
    padding: '8px 4px 4px',
    width: 480,
    maxWidth: '92vw',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: SLING_INK,
    fontFamily: 'Open Sans, sans-serif',
  },
  preview: {
    width: '100%',
    maxHeight: 220,
    objectFit: 'contain',
    background: SLING_CREAM,
    borderRadius: 8,
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: SLING_INK,
    marginBottom: 6,
    marginTop: 16,
    fontFamily: 'Open Sans, sans-serif',
  },
  dialogField: {
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
  },
  muted: {
    fontSize: 14,
    color: '#6b6f76',
    marginTop: 8,
  },
  urlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
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
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginBottom: 8,
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

export const SidebarDrawer = ({open, toggleDrawer, details}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState('');
  const [altText, setAltText] = useState('');

  useEffect(() => {
    setName(details?.title || details?.name || '');
    setAltText(details?.alt_text || details?.altText || '');
  }, [details]);

  const handleCopyUrl = () => {
    if (!details?.url) return;
    navigator.clipboard
      .writeText(details.url)
      .then(() => {
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Image URL copied to clipboard.',
        });
      })
      .catch(() => {});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateImage({
        id: mediaId(details),
        name,
        altText,
      }),
    );
    toggleDrawer(false);
  };

  const handleClose = () => toggleDrawer(false);

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      classes={{paper: classes.dialogPaper}}>
      <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={1}>
        <Typography className={classes.dialogTitle}>Edit image</Typography>
        <IconButton aria-label='Close edit' size='small' onClick={handleClose}>
          <Icon>close</Icon>
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {details?.url && (
            <img src={details.url} alt={altText || name} className={classes.preview} />
          )}
          <Typography className={classes.fieldLabel}>Name</Typography>
          <TextField
            className={classes.dialogField}
            variant='outlined'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography className={classes.fieldLabel}>Alt text</Typography>
          <TextField
            className={classes.dialogField}
            variant='outlined'
            placeholder='Alt text'
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
          <Typography className={classes.fieldLabel}>Image URL</Typography>
          <Box className={classes.urlRow}>
            <TextField
              className={classes.dialogField}
              variant='outlined'
              value={details?.url || ''}
              InputProps={{readOnly: true}}
            />
            <Button className={classes.copyBtn} onClick={handleCopyUrl}>
              Copy URL
            </Button>
          </Box>
          <Typography className={classes.muted}>
            Added {formatDate(details?.added_on)} · Updated {formatDate(details?.updated_on)}
          </Typography>
          <Box className={classes.dialogFooter}>
            <Button type='submit' className={classes.primaryBtn}>
              Save
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
