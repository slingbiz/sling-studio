import React from 'react';
import {makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {green, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import clsx from 'clsx';

const CoinStats = (props) => {
  const {icon, bgColor, data, heading} = props;

  const useStyles = makeStyles((theme) => ({
    statsCard: {
      borderRadius: theme.overrides.MuiCardLg.root.borderRadius,
    },
    root: {
      height: 50,
      width: 50,
      borderRadius: theme.overrides.MuiCardLg.root.borderRadius,
      backgroundColor: bgColor,
      [theme.breakpoints.up('md')]: {
        height: 60,
        width: 60,
      },
      [theme.breakpoints.up('xl')]: {
        height: 70,
        width: 70,
      },
    },
  }));

  const classes = useStyles(props);

  return (
    <AppCard className={clsx(classes.statsCard, 'card-hover')}>
      <Box display='flex' alignItems='center'>
        <Box p={3} fontSize={{xs: 30, md: 48}} clone>
          <Avatar className={classes.root}>
            <img alt='' src={icon} />
          </Avatar>
        </Box>

        <Box position='relative' ml={{xs: 3, xl: 6}}>
          <Box component='p' fontSize={14} color='text.secondary' mb={2}>
            {heading}
          </Box>
          <Box
            component='h3'
            display='inline-block'
            fontWeight={Fonts.MEDIUM}
            fontSize={20}>
            ${data.price}
          </Box>
          <Box
            component='span'
            ml={3}
            fontSize={16}
            fontWeight={Fonts.MEDIUM}
            color={data.increment > 0.0 ? green[500] : red[500]}>
            {data.increment}%
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default CoinStats;

CoinStats.defaultProps = {
  bgColor: '',
  data: {
    price: '',
    increment: null,
  },
};

CoinStats.propTypes = {
  bgColor: PropTypes.string,
  data: PropTypes.object,
  heading: PropTypes.any.isRequired,
};
