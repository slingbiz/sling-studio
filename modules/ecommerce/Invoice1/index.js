import React from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Header from './Header';
import ItemList from './ItemList';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppTableContainer from '../../../@crema/core/AppTableContainer';
import AppAnimate from '../../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme) => ({
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const Invoice1 = (props) => {
  const classes = useStyles(props);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box flex={1} display='flex' flexDirection='column' alignItems='center'>
        <Box flex={1} maxWidth={900}>
          <Box pt={{xl: 8}} mb={{xs: 6, lg: 8}} clone>
            <Card>
              <Header />
              <AppTableContainer>
                <ItemList />
              </AppTableContainer>
            </Card>
          </Box>

          <Box
            mb={{xs: 3, lg: 4}}
            component='h4'
            color='grey.600'
            textAlign='center'
            fontSize={16}
            fontWeight={Fonts.BOLD}
            className={classes.textUppercase}>
            <IntlMessages id='invoice.thankYou' />
          </Box>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default Invoice1;
