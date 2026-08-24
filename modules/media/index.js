import React from 'react';
import ApisSideBar from './MediaSideBar/index';
import MediaDetail from './MediaDetail';
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
      width: '14rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '16rem',
    },
  },
}));

const Index = (props) => {
  const classes = useStyle();
  const query = props.router.query || {};
  const {all} = query;
  const pageKey = all?.[0] || 'gallery';

  const {messages} = useIntl();
  const getTitle = () => {
    const titleKey = all?.join('.') || 'gallery';
    return messages[titleKey] || all?.map((v) => capitalize(v)).join(' / ') || 'Media Gallery';
  };

  const basePath = all ? `` : `media/`;

  return (
    <AppsContainer
      pagesClasses={classes}
      title={getTitle()}
      sidebarContent={<ApisSideBar basePath={basePath} noSubChild={true} />}>
      <MediaDetail titleKey={getTitle()} pageKey={pageKey} />
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
