import React from 'react';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
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
    image: {
      width: '100%',
    },
  };
});

const Error500 = () => {
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
        <Box
          mb={{xs: 4, xl: 8}}
          maxWidth={{xs: 200, sm: 300, xl: 624}}
          width='100%'>
          <img
            className={classes.image}
            src={'/images/errorPageImages/500.png'}
            alt='500'
          />
        </Box>
        <Box mb={{xs: 4, xl: 5}}>
          <Box
            variant='h3'
            mb={{xs: 3, xl: 10}}
            fontSize={{xs: 20, md: 24}}
            fontWeight={Fonts.BOLD}>
            <IntlMessages id='error.500Error' />.
          </Box>
          <Box
            mb={{xs: 4, xl: 10}}
            color={grey[600]}
            fontSize={16}
            fontWeight={Fonts.MEDIUM}>
            <Typography>
              <IntlMessages id='error.500Message1' />
            </Typography>
            <Typography>
              <IntlMessages id='error.500Message2' />
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={onGoBackToHome}>
            <IntlMessages id='error.goBackToHome' />
          </Button>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Error500;
