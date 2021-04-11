import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {Box, makeStyles, Typography} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  drTime: {
    fontWeight: Fonts.BOLD,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    '@media screen and (max-width: 1600px) and (min-width: 1280px)': {
      display: 'none',
    },
  },
  drCardContent: {
    width: 'calc(100% - 50px)',
    display: 'flex',
    alignItems: 'center',
  },
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}));

const DrCard = ({data}) => {
  const {bgColor, icon, time, category, name} = data;
  const classes = useStyles();
  return (
    <AppCard
      height={1}
      style={{backgroundColor: bgColor}}
      className='card-hover'>
      <Box display='flex'>
        <Box mr={3} clone alignSelf='center'>
          <img src={icon} alt='icon' />
        </Box>
        <Box className={classes.drCardContent}>
          <Box flex={1} color='white' overflow='hidden' mr={2}>
            <Typography
              className={classes.textTruncate}
              component='h5'
              variant='inherit'
              color='inherit'>
              {category}
            </Typography>
            <Box className={classes.textTruncate} component='p' pt={1.5}>
              {name}
            </Box>
          </Box>
          <Box
            className={classes.drTime}
            ml='auto'
            display='flex'
            alignItems='center'
            borderRadius='50%'
            justifyContent='center'
            style={{height: 50, width: 50}}>
            {time}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default DrCard;
