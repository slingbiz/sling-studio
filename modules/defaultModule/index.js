import React from 'react';
import PropTypes from 'prop-types';
import DefaultList from './DefaultList';
import DefaultSideBar from './DefaultSideBar';
import AppsContainer from '../../@sling/core/AppsContainer';
import {useRouter, withRouter} from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';

const useStyle = makeStyles((theme) => ({
  appsSidebar: {
    margin: '0',
    padding: '0',
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '12rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '15rem',
    },
  },
}));

const Index = (props) => {
  const classes = useStyle();
  const router = useRouter();
  const baseKey = router.asPath.replace('/', '');

  const capital = (word) => {
    word = word.toLowerCase();
    return word[0].toUpperCase() + word.substring(1);
  };

  return (
    <Dialog open={true}>
      <AppsContainer
        pagesClasses={classes}
        title={capital(baseKey)}
        sidebarContent={
          <DefaultSideBar basePath={router.asPath} noSubChild={true} />
        }>
        <DefaultList titleKey={capital(baseKey)} pageKey={baseKey} />
      </AppsContainer>
    </Dialog>
  );
};

export default withRouter(Index);

Index.defaultProps = {
  match: null,
};

Index.prototype = {
  match: PropTypes.node,
};
