import React from 'react';
import ApisSideBar from './ApisSideBar/index';
import ApisList from './ApisList';
import ApisDetail from './ApisDetail';
import {useDispatch} from 'react-redux';
import {capitalize} from '@material-ui/core/utils';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';
import {withRouter} from 'next/router';
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
  const query = props.router.query || {};
  const {all} = query;
  const onGetMainComponent = () => {
    let pageKey = all?.[0] || 'guide';
    console.log(all?.length, '@@@@all?.length@@@@');
    if (all?.length >= 1) {
      return <ApisDetail titleKey={getTitle()} pageKey={pageKey} />;
    } else {
      return <ApisList titleKey={getTitle()} pageKey={pageKey} />;
    }
  };

  const getTitle = () => {
    const titleKey = all?.join('.') || 'guide';
    return messages[titleKey] || all?.map((v) => capitalize(v)).join(' / ');
  };

  const {messages} = useIntl();
  const basePath = all ? `` : `headless-apis/`;
  console.log(all, '@@@@@@@@@@@all@@@@@@@@@@@@@');
  if (!all) {
    // return <ApisList />;
  }
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
