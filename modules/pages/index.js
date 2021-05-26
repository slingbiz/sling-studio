import React, {useEffect} from 'react';
import PagesSideBar from './PagesSideBar/index';
import TasksList from './TasksList';
import PagesDetail from './PagesDetail';
import {useDispatch} from 'react-redux';
import {capitalize} from '@material-ui/core/utils';

import {
  onGetToDoFolderList,
  onGetToDoLabelList,
  onGetToDoPriorityList,
  onGetToDoStaffList,
  onGetToDoStatusList,
} from '../../redux/actions';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';
import {useRouter, withRouter} from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles((theme) => ({
  appsSidebar: {
    margin: '0',
    padding: '0',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '12rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '15rem',
    },
  },
}));

const Index = (props) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  useEffect(() => {
    dispatch(onGetToDoLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoPriorityList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStaffList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStatusList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    console.log(
      props.router.query.all.length,
      'props.router.query.all.length',
      props.router.query.all,
    );
    if (props.router.query.all.length > 1) {
      return <PagesDetail titleKey={getTitle()} />;
    } else {
      return <TasksList />;
    }
  };

  const getTitle = () => {
    const titleKey = props.router.query.all.join('.');
    return (
      messages[titleKey] ||
      props.router.query.all.map((v) => capitalize(v)).join(' / ')
    );
  };

  const {messages} = useIntl();
  const basePath = `/pages/${props.router.query.all[0]}`;

  return (
    <AppsContainer
      pagesClasses={classes}
      title={getTitle()}
      sidebarContent={<PagesSideBar basePath={basePath} />}>
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default withRouter(Index);

Index.defaultProps = {
  match: null,
};

Index.prototype = {
  match: PropTypes.node,
};
