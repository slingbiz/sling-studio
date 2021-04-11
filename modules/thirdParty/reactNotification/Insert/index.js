import React from 'react';
import {store} from 'react-notifications-component';
import Button from '@material-ui/core/Button';

import notification from '../helpers/notification';
import {getMessage, getTitle, getType} from '../helpers/randomize';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

const InsertExample = (props) => {
  const add = (insert) => {
    const type = getType();
    return store.addNotification(
      Object.assign({}, notification, {
        type,
        insert,
        message: getMessage(type),
        title: getTitle(type),
      }),
    );
  };

  const useStyles = makeStyles((theme) => ({
    btnRoot: {
      marginBottom: 4,
      marginTop: 4,
      marginLeft: 8,
      marginRight: 8,
    },
  }));
  const classes = useStyles(props);

  return (
    <Box>
      <Button
        className={classes.btnRoot}
        color='primary'
        variant='contained'
        onClick={() => add('top')}>
        Top
      </Button>
      <Button
        className={classes.btnRoot}
        color='primary'
        variant='contained'
        onClick={() => add('bottom')}>
        Bottom
      </Button>
    </Box>
  );
};
export default InsertExample;
