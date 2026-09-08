import React from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';

const useStyles = makeStyles(() => ({
  wrap: {
    height: '100%',
    minHeight: 280,
    background: '#fff8f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 32,
    boxSizing: 'border-box',
    fontFamily: 'Open Sans, sans-serif',
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: '#163a5f',
    fontFamily: 'Open Sans, sans-serif',
  },
  body: {
    margin: '8px 0 0',
    fontSize: 14,
    color: '#6b6f76',
    lineHeight: 1.5,
    fontFamily: 'Open Sans, sans-serif',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    flexWrap: 'wrap',
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
}));

const DRAFTS_HREF = '/widgets/widgets-integration?status=draft';
const CREATE_HREF = '/create';

const NotLivePreview = ({onNavigate}) => {
  const classes = useStyles();
  const router = useRouter();

  const go = (href) => {
    if (typeof onNavigate === 'function') {
      onNavigate();
    }
    router.push(href);
  };

  return (
    <Box className={classes.wrap}>
      <Typography className={classes.title} component='h2'>
        This page is not live yet
      </Typography>
      <Typography className={classes.body}>
        Publish the widgets to see it on the site.
      </Typography>
      <Box className={classes.actions}>
        <Button className={classes.outlineBtn} onClick={() => go(DRAFTS_HREF)}>
          Open drafts
        </Button>
        <Button className={classes.primaryBtn} onClick={() => go(CREATE_HREF)}>
          Go to Create
        </Button>
      </Box>
    </Box>
  );
};

export default NotLivePreview;
