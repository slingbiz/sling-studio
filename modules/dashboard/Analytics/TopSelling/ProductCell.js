import React from 'react';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
    },
  },
  statsCard: {
    borderRadius: theme.overrides.MuiCardLg.root.borderRadius,
    padding: 12,
  },
  logo: {
    height: 70,
    width: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
}));

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
      <Box display='flex'>
        <img className={classes.logo} alt='' src={data.icon} />

        <Box flex={1} ml={4}>
          <Box
            component='h3'
            color='primary.main'
            display='inline-block'
            fontWeight={Fonts.MEDIUM}
            mb={0.5}
            fontSize={14}>
            {data.name}
          </Box>
          <Box component='p' fontSize={12} color='text.secondary' mb={1}>
            {data.description}
          </Box>
          <Box component='p' fontSize={14} fontWeight={Fonts.MEDIUM}>
            ${data.price}
          </Box>
        </Box>
      </Box>
      <Hidden xsDown>
        <Box
          ml='auto'
          display='flex'
          alignItems='center'
          justifyContent='flex-end'>
          <Box height={50} width={50}>
            <AppCircularProgress
              minWidth={50}
              maxWidth={50}
              activeColor={data.color}
              thickness={4}
              hidePercentage
              value={data.rate}
            />
          </Box>
          <Box display='flex' alignItems='center' ml={2} mr={-2} p={2} pr={0}>
            <Box>
              <Box color='text.secondary'>Sales</Box>
              <Box>{data.rate}%</Box>
            </Box>
            <Box ml={2} color='grey.400'>
              <NavigateNextIcon />
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default ProductCell;
