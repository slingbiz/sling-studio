import React, {useEffect} from 'react';
import ApisSideBar from './PagesSideBar/index';
import PagesList from './PagesList';
import RoutesDetail from './PagesDetail';
import {capitalize} from '@material-ui/core/utils';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@sling/core/AppsContainer';
import {useRouter, withRouter} from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLayoutConfig} from '../../redux/actions';

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
  const classes = useStyle();
  const query = props.router.query || {};
  const {all} = query;
  const dispatch = useDispatch();
  const layoutData = useSelector(({dashboard}) => dashboard.layoutData);

  useEffect(() => {
    if (!layoutData) {
      dispatch(fetchLayoutConfig());
    }
  }, [dispatch]);

  const onGetMainComponent = () => {
    let pageKey = all?.[0] || 'all';
    if (all?.length >= 1) {
      return <RoutesDetail titleKey={getTitle()} pageKey={pageKey} />;
    } else {
      return <PagesList titleKey={getTitle()} pageKey={pageKey} />;
    }
  };

  const getTitle = () => {
    const titleKey = all?.join('.') || 'all';
    return messages[titleKey] || all?.map((v) => capitalize(v)).join(' / ');
  };

  const {messages} = useIntl();
  const basePath = all ? `/pages/${all.join('/')}` : `pages/`;
  if (!all) {
    // return <ApisList />;
  }

  // const {account} = useSelector(({account}) => account);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!account) {
  //     router.replace('/account-setup');
  //   }
  // }, [account]);

  return (
    <AppsContainer
      pagesClasses={classes}
      title={getTitle()}
      sidebarContent={<ApisSideBar basePath={basePath} noSubChild={true} />}>
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
