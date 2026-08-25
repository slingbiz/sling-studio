import React from 'react';
import {Box, Typography, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {SLING_CREAM, SLING_INK, SLING_ORANGE} from '../../../aiBuilder/slingTheme';
import CopyButton from './CopyButton';

const useStyles = makeStyles(() => ({
  page: {
    padding: '12px 28px 32px',
    background: '#fff',
    fontFamily: 'Open Sans, system-ui, sans-serif',
  },
  tableHead: {
    display: 'grid',
    gridTemplateColumns: 'minmax(180px, 1.2fr) minmax(200px, 2fr) auto',
    gap: 12,
    padding: '12px 8px 10px',
    color: '#6b6f76',
    fontSize: 14,
    fontWeight: 500,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'minmax(180px, 1.2fr) minmax(200px, 2fr) auto',
    gap: 12,
    alignItems: 'center',
    padding: '12px 8px',
    minHeight: 60,
  },
  nameCell: {
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: SLING_INK,
    lineHeight: 1.35,
  },
  handle: {
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.35,
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14,
      height: 40,
      background: SLING_CREAM,
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  guide: {
    fontSize: 14,
    color: '#6b6f76',
    background: SLING_CREAM,
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
  },
  linkGuide: {
    cursor: 'pointer',
    color: SLING_ORANGE,
    fontWeight: 600,
    fontSize: 14,
  },
}));

const KeyUsage = () => {
  const classes = useStyles();
  const {account} = useSelector(({account}) => account);
  const apiKey = account?.apiKey || '';
  const clientId = account?.user || '';

  return (
    <Box className={classes.page}>
        <Box className={classes.tableHead}>
          <span>Key</span>
          <span>Value</span>
          <span />
        </Box>

        <Box className={classes.row}>
          <Box className={classes.nameCell}>
            <Typography className={classes.name}>Your API Key</Typography>
            <Typography className={classes.handle}>
              NEXT_PUBLIC_CLIENT_KEY_SECRET
            </Typography>
          </Box>
          <TextField
            value={apiKey}
            placeholder='API key'
            fullWidth
            variant='outlined'
            InputProps={{
              readOnly: true,
            }}
            className={classes.field}
          />
          <Box className={classes.actions}>
            <CopyButton content={apiKey} label='Copy API key' />
          </Box>
        </Box>

        <Box className={classes.row}>
          <Box className={classes.nameCell}>
            <Typography className={classes.name}>Your Client Id</Typography>
            <Typography className={classes.handle}>NEXT_PUBLIC_CLIENT_ID</Typography>
          </Box>
          <TextField
            value={clientId}
            placeholder='Client id'
            fullWidth
            variant='outlined'
            InputProps={{
              readOnly: true,
            }}
            className={classes.field}
          />
          <Box className={classes.actions}>
            <CopyButton content={clientId} label='Copy client id' />
          </Box>
        </Box>

        <Box className={classes.guide}>
          Learn more about the{' '}
          <Typography
            onClick={() => window.open(`${process.env.GUIDE_URL}`, '_blank')}
            component='span'
            className={classes.linkGuide}>
            Sling Key Usage and Frontend Setup.
          </Typography>
        </Box>
    </Box>
  );
};

export default KeyUsage;
