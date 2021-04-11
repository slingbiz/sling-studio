import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    [theme.breakpoints.up('lg')]: {
      width: 50,
      height: 50,
    },
  },
}));

const NewsItem = ({item}) => {
  const classes = useStyles();
  return (
    <Box className='item-hover' display='flex' px={5} py={2}>
      <Avatar className={classes.avatarRoot} src={item.user.profilePic} />
      <Box ml={4}>
        <Box component='h6' mb={0.5} fontWeight={Fonts.MEDIUM}>
          {item.title}
        </Box>
        <Box component='p' color='text.secondary'>
          {item.desc}
          <Box ml={2} component='span' color='primary.main' className='pointer'>
            Read More
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsItem;
