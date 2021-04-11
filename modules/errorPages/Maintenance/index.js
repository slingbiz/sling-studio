import React from 'react';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import {initialUrl} from '../../../shared/constants/AppConst';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      fontWeight: Fonts.BOLD,
      fontSize: 16,
      textTransform: 'capitalize',
    },
  };
});

const Maintenance = () => {
  const router = useRouter();

  const onGoBackToHome = () => {
    router.push(initialUrl);
  };

  const classes = useStyles();

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        py={{xl: 8}}
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'>
        <Box mb={{xs: 8, xl: 16}}>
          <Box
            component='h3'
            mb={{xs: 4, xl: 12}}
            fontSize={{xs: 20, md: 24}}
            fontWeight={Fonts.BOLD}>
            <IntlMessages id='error.mantainanceMessage1' />
          </Box>
          <Box
            mb={{xs: 5, xl: 16}}
            color={grey[600]}
            fontSize={16}
            fontWeight={Fonts.MEDIUM}>
            <Typography>
              <IntlMessages id='error.mantainanceMessage2' />
            </Typography>
            <Typography>
              <IntlMessages id='error.mantainanceMessage3' />.
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={onGoBackToHome}>
            <IntlMessages id='error.takeMeToHome' />
          </Button>
        </Box>
        <Box mb={5} maxWidth={{xs: 300, sm: 400, xl: 672}} width='100%'>
          <img
            src={'/images/errorPageImages/maintenance.png'}
            alt='404'
          />
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Maintenance;
