import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import SmsIcon from '@material-ui/icons/Sms';
import messages from '../../services/db/messages/messages';
import {makeStyles} from '@material-ui/core';
import MessageItem from './MessageItem';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Scrollbar from '../Scrollbar';
import IntlMessages from '../../utility/IntlMessages';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';

const HeaderMessages = (props) => {
  const [anchorMessages, setAnchorMessages] = React.useState(null);

  const onClickMessagesButton = (event) => {
    setAnchorMessages(event.currentTarget);
  };

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
        borderColor: theme.palette.grey[200],
        color: theme.palette.grey[400],
        '&:hover, &:focus': {
          color: theme.palette.text.primary,
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
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
    badgeStyle: {
      marginRight: 8,
    },
    smsIcon: {
      fontSize: 22,
      color: theme.palette.text.secondary,
      [theme.breakpoints.up('xl')]: {
        fontSize: 30,
      },
    },
    listRoot: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      <IconButton
        className={clsx(classes.notiBtn, 'notiBtn')}
        aria-label='show 4 new mails'
        color='inherit'
        onClick={onClickMessagesButton}>
        <Badge
          className={classes.badgeStyle}
          badgeContent={messages.length}
          color='secondary'>
          <SmsIcon className={clsx(classes.smsIcon, 'smsIcon')} />
        </Badge>
        <Hidden mdUp>
          <Box
            ml={4}
            fontSize={16}
            fontFamily='Poppins'
            fontWeight={Fonts.REGULAR}
            component='span'>
            <IntlMessages id='dashboard.messages' />
          </Box>
        </Hidden>
      </IconButton>

      <Popover
        anchorEl={anchorMessages}
        id='app-message'
        className={classes.crPopover}
        open={Boolean(anchorMessages)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setAnchorMessages(null)}>
        <Box>
          <Box px={5} py={3}>
            <Box component='h5' fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='dashboard.messages' />({messages.length})
            </Box>
          </Box>
          <Scrollbar className='scroll-submenu'>
            <List
              className={classes.listRoot}
              onClick={() => {
                setAnchorMessages(null);
              }}>
              {messages.map((item, index) => (
                <MessageItem key={item.id} item={item} />
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

export default HeaderMessages;
