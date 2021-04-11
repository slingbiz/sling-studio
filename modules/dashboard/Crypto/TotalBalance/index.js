import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import CoinsInfo from './CoinsInfo';
import {indigo} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const TotalBalance = ({totalBalanceData}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: 'white',
      color: 'black',
      fontWeight: Fonts.LIGHT,
      textTransform: 'capitalize',
      width: 96,
      fontSize: 16,
      '&:hover, &:focus': {backgroundColor: 'white', color: 'black'},
      lineHeight: '16px',
      [theme.breakpoints.up('sm')]: {
        lineHeight: '20px',
      },
      [theme.breakpoints.up('xl')]: {
        lineHeight: '26px',
      },
    },
    btnPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      fontWeight: Fonts.LIGHT,
      textTransform: 'capitalize',
      width: 96,
      fontSize: 16,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
      lineHeight: '16px',
      [theme.breakpoints.up('sm')]: {
        lineHeight: '20px',
      },
      [theme.breakpoints.up('xl')]: {
        lineHeight: '26px',
      },
    },
    textUppercase: {
      textTransform: 'uppercase',
    },
  }));
  const classes = useStyles();

  return (
    <Box>
      <Box
        component='h2'
        color='text.primary'
        fontSize={16}
        className={classes.textUppercase}
        mb={{xs: 4, sm: 4, xl: 6}}
        fontWeight={Fonts.BOLD}>
        <IntlMessages id='dashboard.totalBalance' />
      </Box>
      <AppCard style={{backgroundColor: indigo[500]}}>
        <Box
          mb={{xs: 3, md: 6, xl: 8}}
          display='flex'
          flexDirection={{xs: 'column', xl: 'row'}}
          alignItems={{xl: 'center'}}>
          <Box display='flex' alignItems='center'>
            <Box
              component='h3'
              color='primary.contrastText'
              fontWeight={Fonts.BOLD}
              fontSize={20}>
              ${totalBalanceData.balance}
            </Box>
            <Box
              component='span'
              ml={3}
              color={indigo[100]}
              fontSize={14}
              whiteSpace='nowrap'>
              <IntlMessages id='dashboard.avlBalance' />
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            ml={{xs: 0, xl: 'auto'}}
            mt={{xs: 2, xl: 0}}>
            <Box>
              <Button className={classes.root}>
                <IntlMessages id='common.send' />
              </Button>
            </Box>
            <Box ml={3}>
              <Button className={classes.btnPrimary}>
                <IntlMessages id='common.receive' />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          component='p'
          mb={{xs: 3.5, md: 4, xl: 6}}
          fontSize={16}
          color={indigo[100]}>
          <IntlMessages id='dashboard.buyCurrency' />
        </Box>
        <Box pt={{md: 2, lg: 3, xl: 6}}>
          <CoinsInfo coins={totalBalanceData.coins} />
        </Box>
      </AppCard>
    </Box>
  );
};

export default TotalBalance;

TotalBalance.defaultProps = {
  totalBalanceData: {
    balance: '',
    coins: [],
  },
};

TotalBalance.propTypes = {
  totalBalanceData: PropTypes.object,
};
