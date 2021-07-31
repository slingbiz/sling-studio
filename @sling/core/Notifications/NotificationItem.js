import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {ListItem, makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 14,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  minWidth0: {
    minWidth: 0,
  },
  listItemRoot: {
    padding: '8px 20px',
  },
}));

const NotificationItem = (props) => {
  const {item} = props;
  const classes = useStyles(props);
  return (
    <ListItem className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={4}>
        <ListItemAvatar className={classes.minWidth0}>
          <Avatar
            className={classes.avatar}
            alt='Remy Sharp'
            src={item.image}
          />
        </ListItemAvatar>
      </Box>
      <Box component='p' className={classes.textBase} color='text.secondary'>
        <Box
          mr={2}
          component='span'
          display='inline-block'
          color='text.primary'
          fontWeight={Fonts.MEDIUM}>
          {item.name}
        </Box>
        {item.message}
      </Box>
    </ListItem>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
};
