import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 14,
  },
  listItemAvatar: {
    minWidth: 'auto',
    marginRight: theme.spacing(4),
  },
  avatarSize: {
    width: 48,
    height: 48,
  },
}));

const NotificationCell = ({item}) => {
  const classes = useStyles();

  return (
    <ListItem
      disableGutters
      className='item-hover'
      style={{paddingLeft: 20, paddingRight: 20}}>
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar className={classes.avatarSize} src={item.image} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box
            color='text.primary'
            mb={0.5}
            component='span'
            fontWeight={Fonts.MEDIUM}
            fontSize={14}>
            {item.type}
          </Box>
        }
        secondary={
          <Box
            component='span'
            display='flex'
            alignItems='center'
            fontSize={14}
            color='primary.main'>
            {item.name}
            <Box component='span' display='block' ml={2} color='text.secondary'>
              {item.message}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export default NotificationCell;

NotificationCell.propTypes = {
  item: PropTypes.object.isRequired,
};
