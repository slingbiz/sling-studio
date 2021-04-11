import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const StatsCard = ({icon, bgColor, text, value}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: 50,
      width: 50,
      backgroundColor: bgColor,
      [theme.breakpoints.up('md')]: {
        height: 60,
        width: 60,
      },
      [theme.breakpoints.up('lg')]: {
        height: 70,
        width: 70,
      },
      [theme.breakpoints.up('xl')]: {
        height: 85,
        width: 85,
      },
    },
  }));
  const classes = useStyles();
  return (
    <AppCard height={1} textAlign='center'>
      <Box
        display='flex'
        p={{xs: 3, xl: 4}}
        mb={{xs: 4, md: 5}}
        mx='auto'
        clone>
        <Avatar className={classes.root}>
          <img src={icon} alt='' />
        </Avatar>
      </Box>
      <Box component='p' color='text.secondary' mb={2} fontSize={14}>
        {text}
      </Box>
      <Box component='h3' fontWeight={Fonts.MEDIUM} fontSize={20}>
        {value}
      </Box>
    </AppCard>
  );
};

export default StatsCard;

StatsCard.defaultProps = {
  bgColor: '',
  value: '',
};

StatsCard.propTypes = {
  text: PropTypes.any.isRequired,
  bgColor: PropTypes.string,
  value: PropTypes.string,
};
