import React from 'react';
import {store} from 'react-notifications-component';
import Button from '@material-ui/core/Button';
import {getContainer, getMessage, getType} from '../helpers/randomize';
import notification from '../helpers/notification';
import Box from '@material-ui/core/Box';

const AnimationEntrance = () => {
  const add = (htmlClasses) => {
    const type = getType();
    return store.addNotification(
      Object.assign({}, notification, {
        animationIn: htmlClasses,
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
          onClick={() => add(['animated bounceIn'])}>
          Bounce In
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated fadeIn'])}>
          Fade In
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated flipInX'])}>
          Flip In X
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated flipInY'])}>
          Flip In Y
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated zoomIn'])}>
          Zoom In
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated flash'])}>
          Flash
        </Button>
      </Box>
      <Box mr={2} my={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => add(['animated jackInTheBox'])}>
          Jack In The Box
        </Button>
      </Box>
    </Box>
  );
};
export default AnimationEntrance;
