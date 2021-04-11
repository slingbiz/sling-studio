import React from 'react';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 50,
    width: 50,
    overflow: 'hidden',
  },
}));

const ReviewCell = () => {
  const classes = useStyles();
  return (
    <Box
      position='relative'
      display='flex'
      className='item-hover'
      alignItems='center'
      px={4}
      py={3}
      justifyContent='space-between'>
      <Box display='flex'>
        <Avatar
          className={classes.logo}
          alt='user image'
          src={'/images/avatar/A1.jpg'}
        />

        <Box flex={1} ml={4}>
          <Box
            component='h3'
            color='text.primary'
            display='flex'
            mb={2}
            fontWeight={Fonts.BOLD}
            alignItems='center'
            fontSize={14}>
            <Box
              component='span'
              color='white'
              bgcolor='#388E3C'
              width={34}
              mr={2}
              px={2}
              display='flex'
              alignItems='center'
              height={18}
              borderRadius={10}
              fontSize={12}>
              5 <StarRateIcon style={{fontSize: 16}} />
            </Box>
            Parmar Ravikumar
          </Box>
          <Box component='p' fontSize={14} color='text.secondary'>
            If several languages coalesce, the grammar of the resulting language
          </Box>
          <Box component='p' fontSize={12} color='text.hint'>
            5 hrs ago
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        position='absolute'
        bottom={2}
        right={2}
        flexDirection='row'
        color='#737989'
        alignItems='center'
        fontSize={14}>
        <IconButton style={{marginRight: 5, height: 25, width: 25}}>
          <ThumbUpAltIcon style={{fontSize: 16}} />
        </IconButton>
        345
        <IconButton
          style={{marginRight: 5, marginLeft: 15, height: 25, width: 25}}>
          <ThumbDownIcon style={{fontSize: 16}} />
        </IconButton>
        13
      </Box>
    </Box>
  );
};
export default ReviewCell;
