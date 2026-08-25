import React, {useContext} from 'react';
import {onToggleAppDrawer} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import InfoView from '../../core/InfoView';
import {Box} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import useStyles from './index.style';
import {AppContext} from '../../index';
import AppSidebar from './AppSidebar';

const AppsContainer = (props) => {
  const dispatch = useDispatch();
  const {isAppDrawerOpen} = useSelector(({common}) => common);
  const {footer, navStyle} = useContext(AppContext);
  const {title, description, sidebarContent, fullView, children, pagesClasses} =
    props;
  const classes = useStyles({footer, navStyle, fullView});
  const heading = (title || '').toString().split('-').join(' ');

  return (
    <Box pt={{xl: 4}} flex={1} display='flex' flexDirection='column'>
      <Box
        mb={{xs: fullView ? 4 : 2, lg: fullView ? 5 : 4}}
        mt={{xs: fullView ? 0 : -3, lg: 0}}
        display='flex'
        alignItems='flex-start'>
        {fullView ? null : (
          <Hidden lgUp>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={() => dispatch(onToggleAppDrawer())}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Hidden>
        )}
        <Box minWidth={0}>
          {heading ? (
            <Box
              component='h1'
              style={{
                margin: 0,
                color: '#163a5f',
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 1.3,
                fontFamily: 'Open Sans, sans-serif',
              }}>
              {heading}
            </Box>
          ) : null}
          {description ? (
            <Box
              component='p'
              style={{
                margin: '6px 0 0',
                color: '#6b6f76',
                fontSize: 14,
                lineHeight: 1.5,
                fontFamily: 'Open Sans, sans-serif',
                maxWidth: 640,
              }}>
              {description}
            </Box>
          ) : null}
        </Box>
      </Box>
      <Box className={classes.appsContainer}>
        {sidebarContent ? (
          <AppSidebar
            isAppDrawerOpen={isAppDrawerOpen}
            pagesClasses={pagesClasses}
            footer={footer}
            fullView={fullView}
            navStyle={navStyle}
            sidebarContent={sidebarContent}
          />
        ) : null}

        <Box className={classes.appsMainContent}>
          <Card
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              ...props.cardStyle,
            }}>
            {children}
          </Card>
          <InfoView />
        </Box>
      </Box>
    </Box>
  );
};

export default AppsContainer;

AppsContainer.defaultProps = {
  title: '',
  description: '',
};

AppsContainer.prototype = {
  title: PropTypes.string,
  description: PropTypes.string,
};
