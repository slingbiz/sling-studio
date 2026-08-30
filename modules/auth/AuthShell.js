import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core/styles';
import {
  SLING_CREAM,
  SLING_INK,
  SLING_LINE,
  SLING_MUTED,
  SLING_ORANGE,
} from './authChrome';

const useStyles = makeStyles(() => ({
  page: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: SLING_CREAM,
    padding: '48px 24px',
    fontFamily: 'Open Sans, Helvetica Neue, Arial, sans-serif',
  },
  logo: {
    width: 140,
    marginBottom: 28,
  },
  card: {
    maxWidth: 440,
    width: '100%',
    overflow: 'hidden',
    textAlign: 'left',
    position: 'relative',
    borderRadius: 16,
    border: `1px solid ${SLING_LINE}`,
    boxShadow: 'none',
    padding: '36px 32px 28px',
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 4,
      backgroundColor: SLING_ORANGE,
    },
  },
  title: {
    margin: '0 0 8px',
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.3,
    color: SLING_INK,
  },
  copy: {
    margin: '0 0 28px',
    fontSize: 14,
    lineHeight: 1.5,
    color: SLING_MUTED,
    fontWeight: 400,
  },
}));

const AuthShell = ({title, description, children}) => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <img
        className={classes.logo}
        src='/images/sling-fe.png'
        alt='Sling CMS'
      />
      <Card className={classes.card}>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.copy}>{description}</p>
        {children}
      </Card>
    </Box>
  );
};

export default AuthShell;
