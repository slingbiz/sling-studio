import React from 'react';
import WidgetsSideBar from './WidgetsSideBar/index';
import WidgetsList from './WidgetsList';
import WidgetsDetail from './WidgetsDetail';
import {capitalize} from '@material-ui/core/utils';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@sling/core/AppsContainer';
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
  const classes = useStyle();
  const query = props.router.query || {};
  const {all} = query;
  console.log('Page Key ==> ', all?.[0] || 'guide');
  const onGetMainComponent = () => {
    let pageKey = all?.[0] || 'guide';
    if (all?.length >= 1) {
      return <WidgetsDetail titleKey={getTitle()} pageKey={pageKey} />;
    } else {
      return <WidgetsList titleKey={getTitle()} pageKey={pageKey} />;
    }
  };

  const getTitle = () => {
    const titleKey = all?.join('.') || 'guide';
    return messages[titleKey] || all?.map((v) => capitalize(v)).join(' / ');
  };

  const {messages} = useIntl();
  const basePath = all ? `` : `widgets/`;


  return (
    <AppsContainer
      pagesClasses={classes}
      title={getTitle()}
      sidebarContent={<WidgetsSideBar basePath={basePath} noSubChild={true} />}>
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
