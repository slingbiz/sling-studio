import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useStyles from './MessageItem.style';
import {MessageType} from '../../../../../@crema/services/db/apps/chat/connectionList';
import {getFileSize} from '../../../../../@crema/utility/Utils';

const getMessage = (item, classes) => {
  if (item.message_type === MessageType.TEXT) {
    return (
      <Box component='p' mb={1} ml={3}>
        {item.message}
      </Box>
    );
  } else if (item.message_type === MessageType.DOC) {
    return (
      <Box display='flex' flexWrap='nowrap'>
        <img alt='' src={'/assets/images/icon-docs-dark.svg'} />
        <Box component='span' display='inline-block' ml={2}>
          <Box>{item.media.file_name}</Box>
          <Box>{getFileSize(item.media.file_size)}</Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={classes.mediaWrapper}>
        {item.media.mime_type.startsWith('video') ? (
          <Box display='flex'>
            <video src={item.media.url} />
            <PlayCircleOutlineIcon className={classes.videoIcon} />
          </Box>
        ) : (
          <img alt='' src={item.media.url} />
        )}
      </Box>
    );
  }
};

const ReceiverMessageItem = ({selectedUser, item}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.messageItemRoot, 'left')}
      display='flex'
      justifyContent={'flex-start'}>
      <Box className={classes.messageChatRoot}>
        <Box
          className={clsx(classes.messageTime, 'message-time')}
          component='span'>
          {item.time}
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box className={classes.messageChat}>
            {selectedUser.image ? (
              <Avatar className={classes.profilePic} src={selectedUser.image} />
            ) : (
              <Avatar className={classes.profilePic}>
                {selectedUser.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Box className='message-info'>
              {getMessage(item, classes)}

              {item.edited && (
                <Box className={classes.editRoot}>
                  <EditIcon />
                </Box>
              )}
            </Box>
          </Box>
          {item.message_type === MessageType.TEXT ? null : (
            <Box className='pointer' component='span' mt='auto'>
              <a href={item.media.url} download={item.media.file_name}>
                <img alt='' src={'/assets/images/icon-download.svg'} />
              </a>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReceiverMessageItem;

ReceiverMessageItem.defaultProps = {};

ReceiverMessageItem.prototype = {
  selectedUser: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onClickEditMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
};
