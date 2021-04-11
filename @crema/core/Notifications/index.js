import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import notification from '../../services/db/notifications/notification';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import {makeStyles, Popover} from '@material-ui/core';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Scrollbar from '../Scrollbar';
import IntlMessages from '../../utility/IntlMessages';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import NotificationItem from './NotificationItem';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  crPopover: {
    '& .MuiPopover-paper': {
      width: 260,
      [theme.breakpoints.up('sm')]: {
        width: 300,
      },
      [theme.breakpoints.up('xl')]: {
        width: 380,
      },
    },
    '& .scroll-submenu': {
      maxHeight: 200,
      [theme.breakpoints.up('xl')]: {
        maxHeight: 380,
      },
    },
  },
  btnPopover: {
    borderRadius: 0,
    width: '100%',
    textTransform: 'capitalize',
  },
  notiBtn: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 56,
    fontSize: 16,
    borderRadius: 0,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: theme.palette.grey[800],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      width: 'auto',
      borderLeft: 'solid 1px',
      borderLeftColor: theme.palette.grey[200],
      color: theme.palette.grey[400],
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
      },
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
    },
  },
  notiIcon: {
    fontSize: 22,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  badge: {
    marginRight: 8,
  },
}));

const Notifications = (props) => {
  const [anchorNotification, setAnchorNotification] = React.useState(null);

  const onClickNotificationButton = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const classes = useStyles(props);

  return (
    <>
      <IconButton
        className={clsx(classes.notiBtn, 'notiBtn')}
        aria-label='show 17 new notifications'
        color='inherit'
        onClick={onClickNotificationButton}>
        <Badge
          className={classes.badge}
          badgeContent={notification.length}
          color='secondary'>
          <NotificationsActiveIcon
            className={clsx(classes.notiIcon, 'notiIcon')}
          />
        </Badge>
        <Hidden mdUp>
          <Box
            ml={4}
            fontSize={16}
            fontFamily='Poppins'
            fontWeight={Fonts.REGULAR}
            component='span'>
            <IntlMessages id='common.notifications' />
          </Box>
        </Hidden>
      </IconButton>

      <Popover
        anchorEl={anchorNotification}
        id='language-switcher'
        className={classes.crPopover}
        keepMounted
        open={Boolean(anchorNotification)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setAnchorNotification(null)}>
        <Box>
          <Box px={5} py={3}>
            <Box component='h5' fontFamily='Poppins' fontSize={16}>
              <IntlMessages id='common.notifications' />({notification.length})
            </Box>
          </Box>
          <Scrollbar className='scroll-submenu'>
            <List
              className={classes.list}
              onClick={() => {
                setAnchorNotification(null);
              }}>
              {notification.map((item, index) => (
                <NotificationItem key={item.id} item={item} />
              ))}
            </List>
          </Scrollbar>
          <Box mt={2}>
            <Button
              className={classes.btnPopover}
              variant='contained'
              color='primary'>
              <IntlMessages id='common.viewAll' />
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default Notifications;
