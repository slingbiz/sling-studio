import React from 'react';
import {Box} from '@material-ui/core';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const NoUserScreen = () => {
  return (
    <Box>
      <ChatBubbleOutlineIcon />
      <Box component='p'>
        <IntlMessages id='chatApp.noUser' />
      </Box>
    </Box>
  );
};

export default NoUserScreen;
