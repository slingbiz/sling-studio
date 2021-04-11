import React from 'react';
import {store} from 'react-notifications-component';
import Button from '@material-ui/core/Button';

import {getContainer, getMessage, getType} from '../helpers/randomize';
import notification from '../helpers/notification';
import Box from '@material-ui/core/Box';

const AnimationExit = () => {
  const add = (htmlClasses) => {
    const type = getType();
    return store.addNotification(
      Object.assign({}, notification, {
        slidingExit: {delay: 300},
        animationOut: htmlClasses,
        container: getContainer(),
        message: getMessage(type),
        type,
      }),
    );
  };

  return (
    <Box display='flex' flexWrap='wrap'>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated bounceOut'])}>
          Bounce Out
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated fadeOut'])}>
          Fade Out
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated flipOutX'])}>
          Flip Out X
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated flipOutY'])}>
          Flip Out Y
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated zoomOut'])}>
          Zoom Out
        </Button>
      </Box>
    </Box>
  );
};
export default AnimationExit;
