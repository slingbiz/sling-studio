import React from 'react';
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Button from '@material-ui/core/Button';

import notification from '../helpers/notification';
import {getContainer, getMessage, getTitle} from '../helpers/randomize';
import Box from '@material-ui/core/Box';

export default class TypeExample extends React.Component {
  add = (type) => {
    return store.addNotification(
      Object.assign({}, notification, {
        type,
        title: getTitle(type),
        message: getMessage(type),
        container: getContainer(),
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
            onClick={() => this.add('success')}>
            Success
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('default')}>
            Default
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('warning')}>
            Warning
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('info')}>
            Info
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('danger')}>
            Danger
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.add('awesome')}>
            Custom
          </Button>
        </Box>
      </Box>
    );
  }
}
