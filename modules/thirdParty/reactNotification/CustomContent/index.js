import React from 'react';
import {store} from 'react-notifications-component';
import Button from '@material-ui/core/Button';

import notification from '../helpers/notification';
import {getContainer} from '../helpers/randomize';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default class CustomContentExample extends React.Component {
  addCustomIcon = (type, iconClassName) => {
    let message;
    if (type === 'success') {
      message = 'Your agenda has been successfully synced';
    } else if (type === 'warning') {
      message = 'Warning! All your db will be lost if you proceed';
    } else if (type === 'danger') {
      message = 'Error! You have no update rights';
    }

    store.addNotification(
      Object.assign({}, notification, {
        width: 275,
        container: getContainer(),
        content: (
          <Box className={`notification-custom-${type}`}>
            <Box className='notification-custom-icon'>
              <i className={iconClassName} />
            </Box>
            <Box className='notification-custom-content'>
              <Typography className='notification-message'>
                {message}
              </Typography>
            </Box>
          </Box>
        ),
      }),
    );
  };

  add = () => {
    store.addNotification(
      Object.assign({}, notification, {
        width: 325,
        container: getContainer(),
        content: (
          <Box
            display='flex'
            flexDirection='row'
            className='custom-image-content'>
            <img src='/images/logo.png' alt='' />
            <Box component='span' px={8} py={2}>
              Crema Admin
            </Box>
          </Box>
        ),
      }),
    );
  };

  render() {
    return (
      <Box display='flex' flexWrap='wrap'>
        <Box mr={2} my={1}>
          <Button color='primary' variant='contained' onClick={this.add}>
            Custom Image Content
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              this.addCustomIcon('success', 'fas fa-check-circle')
            }>
            Success with Icon
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              this.addCustomIcon('danger', 'fas fa-exclamation-circle')
            }>
            Danger with Icon
          </Button>
        </Box>
        <Box mr={2} my={1}>
          <Button
            color='primary'
            variant='contained'
            onClick={() =>
              this.addCustomIcon('warning', 'fas fa-exclamation-triangle')
            }>
            Warning with Icon
          </Button>
        </Box>
      </Box>
    );
  }
}
