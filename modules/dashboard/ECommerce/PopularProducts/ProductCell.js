import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  avatarSize: {
    height: 70,
    width: 70,
  },
});

const ProductCell = ({data}) => {
  const classes = useStyles();
  return (
    <Box
      key={data.id}
      display='flex'
      alignItems='center'
      py={2}
      px={5}
      className='item-hover'>
      <Box mr={4} clone>
        <Avatar
          className={classes.avatarSize}
          variant='rounded'
          alt=''
          src={data.icon}
        />
      </Box>

      <Box flex={1}>
        <Box
          component='h3'
          color='primary.main'
          fontWeight={Fonts.MEDIUM}
          mb={0.5}
          fontSize={14}>
          {data.name}
        </Box>
        <Box component='p' fontSize={14} color='text.secondary' mb={1}>
          {data.description}
        </Box>
        <Box component='p' fontSize={14} fontWeight={Fonts.MEDIUM}>
          ${data.price}
          <Box
            component='span'
            fontSize={14}
            ml={3}
            color='text.secondary'
            style={{textDecoration: 'line-through'}}
            mb={1}>
            ${data.mrp}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCell;
