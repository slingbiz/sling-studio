import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {useDropzone} from 'react-dropzone';
import {Box, IconButton, makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {MessageType} from '../../../../../@crema/services/db/apps/chat/connectionList';

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    backgroundColor: theme.palette.grey[100],
    '& .MuiIconButton-label': {
      width: 24,
      height: 24,
      paddingLeft: 3,
    },
  },
}));

const AddNewMessage = ({
  sendFileMessage,
  onSendMessage,
  currentMessage = '',
}) => {
  const [message, setMessage] = useState(currentMessage);
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      console.log('file', file);
      sendFileMessage({
        message: '',
        message_type:
          file.type.startsWith('image') ||
          file.type.startsWith('video') ||
          file.type.startsWith('audio')
            ? MessageType.MEDIA
            : MessageType.DOC,
        media: {
          url: URL.createObjectURL(file),
          mime_type: file.type,
          file_name: file.name,
          file_size: file.size,
        },
      });
    },
  });

  useEffect(() => {
    setMessage(currentMessage);
  }, [currentMessage]);

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickSendMessage();
    }
  };

  const onClickSendMessage = () => {
    if (message) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const classes = useStyles();

  const {messages} = useIntl();

  return (
    <Box display='flex'>
      <TextField
        multiline
        style={{width: '100%'}}
        variant='outlined'
        placeholder={messages['chatApp.sendMessagePlaceholder']}
        value={message}
        onChange={(event) => {
          if (event.target.value !== '\n') setMessage(event.target.value);
        }}
        onKeyPress={onKeyPress}
      />
      <Box ml={2} display='flex' flexDirection='row' alignItems='center'>
        <IconButton
          className={classes.btnRoot}
          onClick={onClickSendMessage}
          style={{height: 40, width: 40, marginRight: 10}}>
          <SendIcon />
        </IconButton>
        {message === '' ? (
          <IconButton
            {...getRootProps({
              className: clsx('dropzone'),
            })}
            style={{height: 40, width: 40}}>
            <input {...getInputProps()} />
            <AttachFileIcon />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
};

export default AddNewMessage;

AddNewMessage.defaultProps = {
  message: '',
};

AddNewMessage.prototype = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  SendMessage: PropTypes.func,
};
