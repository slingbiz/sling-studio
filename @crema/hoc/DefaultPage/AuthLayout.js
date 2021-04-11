import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/styles';
import useStyles from '../../../shared/jss/common/common.style';

const useStyle = makeStyles(() => ({
  appAuth: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    height: '100vh',
    backgroundColor: '#f3f4f6',
    background: `url(/images/auth-background.jpg) no-repeat center center`,
    backgroundSize: 'cover',

    '& .scrollbar-container': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    '& .main-content-view': {
      padding: 20,
    },
    '& .footer': {
      marginRight: 0,
      marginLeft: 0,
    },
  },
}));

export default function AuthLayout({children}) {
  useStyles();
  const classes = useStyle();
  return <Box className={classes.appAuth}>{children}</Box>;
}
