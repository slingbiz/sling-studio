import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {blue} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 14,
  },
}));

const BirthdayCard = (props) => {
  const classes = useStyles(props);
  return (
    <AppCard
      display='flex'
      flexDirection='column'
      p={0}
      height='1'
      contentStyle={{padding: 0}}>
      <Box
        p={{xs: 5, xl: 8}}
        color='primary.contrastText'
        textAlign='center'
        bgcolor={blue[700]}>
        <Box component='h3' fontWeight={Fonts.BOLD} fontSize={16}>
          Sunday, 07 July 1991
        </Box>
      </Box>
      <Box px={{xs: 6, sm: 8, xl: 10}} py={{xs: 5, sm: 7, xl: 8}}>
        <Box
          pb={4}
          flex={1}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'>
          <img src={'/images/cakeicon.png'} alt='cake' />
        </Box>
        <Box mb={{xl: 5}} textAlign='center'>
          <Box component='p' className={classes.textBase}>
            <IntlMessages id='dashboard.antonBirthday' />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default BirthdayCard;
