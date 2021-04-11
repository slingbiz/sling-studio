import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import {lighten, makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    width: 40,
    height: 40,
  },
  iconRoot: {
    fontSize: 18,
    marginLeft: 6,
  },
  btnRoot: {
    textTransform: 'capitalize',
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
    color: theme.palette.primary.main,
    '&:hover, &:focus': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
      color: theme.palette.primary.main,
    },
  },
}));

const FollowItem = ({item}) => {
  const classes = useStyles();
  return (
    <Box
      className='item-hover'
      px={5}
      py={2}
      display='flex'
      alignItems='center'
      flexWrap='wrap'>
      <Box display='flex' alignItems='center' mb={1}>
        <Avatar className={classes.avatarRoot} src={item.profilePic} />
        <Box
          component='p'
          color='text.primary'
          fontSize={14}
          ml={4}
          fontWeight={Fonts.MEDIUM}>
          {item.name}
        </Box>
        <CheckCircleIcon
          className={classes.iconRoot}
          style={{color: '#A0A5B9'}}
        />
      </Box>
      <Box mb={1} ml='auto'>
        <Button variant='contained' size='small' className={classes.btnRoot}>
          Follow
        </Button>
      </Box>
    </Box>
  );
};

export default FollowItem;
