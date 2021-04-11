import React from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  imageCard: {
    backgroundImage: `url(/images/widgets/jombie.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    color: 'white',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'block',
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },

    '& > *': {
      position: 'relative',
      zIndex: 3,
    },
  },
  colorBtn: {
    fontWeight: Fonts.LIGHT,
    fontSize: 14,
    marginRight: 16,
  },
  outlineBtn: {
    fontWeight: Fonts.LIGHT,
    fontSize: 14,
    border: '1px solid',
    borderColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.contrastText,
  },
}));

const Header = (props) => {
  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      className={classes.imageCard}
      titleStyle={{color: 'white'}}
      title={messages['dashboard.jombie']}>
      <Box
        width={{xs: '100%', lg: '70%', xl: '50%'}}
        height={1}
        display='flex'
        flexDirection='column'>
        <Box component='p' fontSize={14}>
          <IntlMessages id='dashboard.jombieContent' />
        </Box>

        <Box pt={4} display='flex' alignItems='center'>
          <Button
            variant='contained'
            color='primary'
            className={classes.colorBtn}>
            <IntlMessages id='dashboard.getStarted' />
          </Button>
          <Button variant='outlined' className={classes.outlineBtn}>
            <IntlMessages id='dashboard.readMore' />
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Header;
