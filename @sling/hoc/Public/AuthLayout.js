import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/styles';
import useStyles from '../../../shared/jss/common/common.style';

const useStyle = makeStyles(() => ({
  appAuth: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    backgroundSize: 'cover',
    maxWidth: '100vw',
    overflowX: 'hidden',

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
