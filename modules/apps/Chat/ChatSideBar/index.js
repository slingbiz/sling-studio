import React, {useState} from 'react';
import UserInfo from './UserInfo';
import UserTabs from './UserTabs';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  chatContent: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  crAppsSearch: {
    position: 'relative',
    marginTop: 0,
    marginBottom: 0,
    width: '100%',

    '& .MuiOutlinedInput-input': {
      padding: '6px 14px',
      paddingLeft: 0,
      [theme.breakpoints.up('xl')]: {
        padding: '10px 14px',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: (props) =>
        props.borderLight ? '#efefef' : theme.palette.text.secondary,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  },
}));

const ChatSideBar = (props) => {
  const [keywords, setKeywords] = useState('');
  const user = useAuthUser();

  const {connectionList} = useSelector(({chatApp}) => chatApp);
  const {loading} = useSelector(({common}) => common);

  const getConnectionList = () => {
    if (keywords !== '') {
      return connectionList.filter((item) =>
        item.name.toUpperCase().includes(keywords.toUpperCase()),
      );
    }
    return connectionList;
  };

  const getChatList = () => {
    let chatsList = connectionList.filter((item) => item.lastMessage);
    if (keywords !== '') {
      chatsList = chatsList.filter((item) =>
        item.name.toUpperCase().includes(keywords.toUpperCase()),
      );
    }
    chatsList.sort((a, b) => {
      let momentA = moment(a.lastMessage.time).format('X');
      let momentB = moment(b.lastMessage.time).format('X');
      return momentB - momentA;
    });
    return chatsList;
  };

  const connectionListData = getConnectionList();

  const chatListData = getChatList();

  const classes = useStyles(props);

  const {messages} = useIntl();

  return (
    <Box className={classes.chatContent}>
      <Box px={6} pt={4} pb={{xs: 2, xl: 5}}>
        <UserInfo user={user} />
      </Box>
      <Box px={6} py={{xs: 2, xl: 5}} w='100%'>
        <TextField
          variant='outlined'
          className={clsx(classes.crAppsSearch, 'crAppsSearch')}
          placeholder={messages['chatApp.search']}
          value={keywords}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className={classes.fontBold}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </Box>

      <UserTabs
        connectionListData={connectionListData}
        chatListData={chatListData}
        loading={loading}
      />
    </Box>
  );
};

export default ChatSideBar;
