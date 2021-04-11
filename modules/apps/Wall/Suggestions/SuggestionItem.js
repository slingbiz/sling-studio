import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  sugImgRoot: {
    width: 50,
    height: 50,
    borderRadius: 10,
    [theme.breakpoints.up('xl')]: {
      width: 70,
      height: 70,
    },
  },
}));

const SuggestionItem = ({item}) => {
  const classes = useStyles();
  return (
    <Box className='item-hover' px={5} py={2}>
      <Box display='flex'>
        <Box mr={4}>
          <Avatar
            className={classes.sugImgRoot}
            src={item.thumb}
            alt={item.name}
          />
        </Box>
        <Box>
          <Box component='h6' mb={0.5} fontWeight={Fonts.MEDIUM}>
            {item.name}
          </Box>
          <Box component='p' color='text.secondary'>
            {item.desc}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SuggestionItem;
