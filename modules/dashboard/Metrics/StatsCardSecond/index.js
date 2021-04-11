import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const useStyle = makeStyles((theme) => ({
  avatarStyle: {
    padding: 12,
    display: 'flex',
    marginBottom: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 60,
    width: 60,
    backgroundColor: (props) => props.bgColor,
    [theme.breakpoints.up('md')]: {
      height: 80,
      width: 80,
    },
    [theme.breakpoints.up('lg')]: {
      height: 90,
      width: 90,
    },
    [theme.breakpoints.up('xl')]: {
      marginBottom: 32,
      height: 130,
      width: 130,
    },
  },
}));
const StatsCardSecond = ({icon, bgColor, text, value}) => {
  const classes = useStyle({bgColor});
  return (
    <AppCard textAlign='center' height={1}>
      <Avatar className={classes.avatarStyle}>
        <img src={icon} alt='' />
      </Avatar>
      <Box component='h3' mb={2} fontSize={20} fontWeight={Fonts.MEDIUM}>
        {value}
      </Box>
      <Box component='p' mb={2} color='text.secondary' fontSize={14}>
        {text}
      </Box>
    </AppCard>
  );
};

export default StatsCardSecond;

StatsCardSecond.defaultProps = {
  bgColor: '',
  value: '',
};

StatsCardSecond.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.any.isRequired,
  value: PropTypes.string,
};
