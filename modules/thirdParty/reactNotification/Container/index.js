import React from 'react';
import {store} from 'react-notifications-component';
import Button from '@material-ui/core/Button';

import notification from '../helpers/notification';
import {getMessage, getTitle, getType} from '../helpers/randomize';
import Box from '@material-ui/core/Box';

export default class ContainerExample extends React.Component {
  add = (container) => {
    const type = getType();

    return store.addNotification(
      Object.assign({}, notification, {
        title: getTitle(type),
        message: getMessage(type),
        container,
        type,
      }),
    );
  };

  render() {
    return (
      <Box display='flex' flexWrap='wrap'>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('top-left')}>
            Top Left
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('top-right')}>
            Top Right
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('top-center')}>
            Top Center
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('bottom-left')}>
            Bottom Left
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('bottom-right')}>
            Bottom Right
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('bottom-center')}>
            Bottom Center
          </Button>
        </Box>
      </Box>
    );
  }
}
