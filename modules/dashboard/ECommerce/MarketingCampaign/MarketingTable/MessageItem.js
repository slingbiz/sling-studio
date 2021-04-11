import React from 'react';
import Box from '@material-ui/core/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 16,
    [theme.breakpoints.up('xl')]: {
      fontSize: 18,
    },
  },
  avatar: {
    width: 40,
    height: 40,
    [theme.breakpoints.up('xl')]: {
      width: 60,
      height: 60,
    },
  },
  minWidth0: {
    minWidth: 0,
  },
  listItemRoot: {
    display: 'flex',
    padding: '0px 0px 4px',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));

const MessageItem = (props) => {
  const {item, listStyle} = props;

  const classes = useStyles(props);

  return (
    <ListItem className={(classes.listItemRoot, `${listStyle}`)}>
      <Box mr={4}>
        <ListItemAvatar className={classes.minWidth0}>
          <Avatar className={classes.avatar} src={item.image} />
        </ListItemAvatar>
      </Box>
      <Box className={classes.textBase}>
        <Box
          component='span'
          fontWeight={Fonts.LIGHT}
          display='block'
          fontSize={{xs: 16, xl: 18}}>
          {item.name}
        </Box>
        <Box component='span' color='text.secondary' display='block'>
          {item.message}
        </Box>
      </Box>
    </ListItem>
  );
};

export default MessageItem;

MessageItem.propTypes = {
  item: PropTypes.object.isRequired,
};
