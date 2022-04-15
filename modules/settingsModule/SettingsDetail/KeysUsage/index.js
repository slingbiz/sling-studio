import React, {useEffect, useState} from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from '@mui/material';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  btnSubmit: {
    fontSize: 16,
    fontWeight: Fonts.BOLD,
    backgroundColor: orange[500],
    margin: 'auto',
    width: 150,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.secondary.contrastText,
    },
  },
  inputText: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgb(232, 241, 250)',
    },
  },
  InfoBox: {
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    marginTop: 20,
  },
  linkGuide: {
    cursor: 'pointer',
    color: theme.palette.primary.light,
  },
  alertGuide: {
    width: '100%',
    marginTop: 20,
  },
}));

const KeyUsage = (props) => {
  const classes = useStyles(props);
  const {titleKey, pageKey} = props;
  const {account} = useSelector(({account}) => account);

  const copyToClipBoard = async () => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(account.apiKey);
    } else {
      return document.execCommand('copy', true, account.apiKey);
    }
  };

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3'>
          {titleKey}
        </Box>
      </AppsHeader>
      <Box p={6} mb={6} className={classes.boxSection}>
        <Typography variant='h5' gutterBottom='true'>
          API Authentication
        </Typography>
        <Grid spacing={2} container direction='row' className={classes.main}>
          <Grid xs={4} item>
            <Typography variant='h6' noWrap>
              Your API Key
            </Typography>
          </Grid>
          <Grid xs={6} item container>
            <TextField
              value={account?.apiKey}
              size='small'
              fullWidth
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              className={classes.inputText}
            />
          </Grid>
          <Button
            onClick={copyToClipBoard}
            variant='contained'
            className={classes.btnSubmit}
            type='submit'
            color='primary'>
            Copy
          </Button>
          <Alert
            icon={<InfoIcon />}
            severity='info'
            className={classes.alertGuide}>
            <Typography>
              Learn more about the{' '}
              <Typography
                onClick={() =>
                  window.open(`${process.env.GUIDE_URL}`, '_blank')
                }
                variant='subtitle2'
                component='span'
                className={classes.linkGuide}>
                Sling Key Usage and Frontend Setup.
              </Typography>{' '}
            </Typography>{' '}
          </Alert>
        </Grid>
      </Box>
    </>
  );
};

export default KeyUsage;
