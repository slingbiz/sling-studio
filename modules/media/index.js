import React from 'react';
import ApisSideBar from './MediaSideBar/index';
import MediaDetail from './MediaDetail';
import PropTypes from 'prop-types';
import AppsContainer from '../../@sling/core/AppsContainer';
import {withRouter} from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {mediaCopy} from '../../@sling/core/AppsContainer/pageIntro';

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
  const intro = mediaCopy[pageKey] || mediaCopy.gallery;
  const basePath = all ? `` : `media/`;

  return (
    <AppsContainer
      pagesClasses={classes}
      title={intro.title}
      description={intro.description}
      sidebarContent={<ApisSideBar basePath={basePath} noSubChild={true} />}>
      <MediaDetail titleKey={intro.title} pageKey={pageKey} />
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
