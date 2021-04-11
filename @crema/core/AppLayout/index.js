import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

import AppContext from '../../utility/AppContext';
import Layouts from './Layouts';
import {ContentView} from '../../index';
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

const CremaLayout = ({children}) => {
  useStyles();
  const {navStyle} = useContext(AppContext);
  const {user} = useSelector(({auth}) => auth);
  const AppLayout = Layouts[navStyle];

  const classes = useStyle();
  return (
    <>
      {user ? (
        <AppLayout>{children}</AppLayout>
      ) : (
        <Box className={classes.appAuth}>
          <ContentView />
        </Box>
      )}
    </>
  );
};

export default React.memo(CremaLayout);
