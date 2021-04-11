import React from 'react';
import BtcGraph from './BtcGraph';
import {Box, makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const BtcVolumeCurrency = (props) => {
  const {data} = props;

  const useStyles = makeStyles((theme) => ({
    textRes: {
      fontSize: 14,
    },
  }));

  const classes = useStyles(props);
  const {messages} = useIntl();
  return (
    <AppCard height='1' title={messages['dashboard.btcVolumeByCurency']}>
      <BtcGraph data={data} />
      <Box
        pl={{xl: 5}}
        pt={5}
        display='flex'
        flexWrap='wrap'
        justifyContent='space-around'>
        {data.map((item) => {
          return (
            <Box
              px={3}
              display='flex'
              flex={1}
              alignItems='center'
              key={item.id}>
              <Box
                component='span'
                height={{xs: 12, xl: 16}}
                width={{xs: 12, xl: 16}}
                borderRadius='50%'
                display='block'
                p={1}
                bgcolor={item.color}
              />
              <Box
                component='span'
                color='text.secondary'
                ml={2}
                className={classes.textRes}>
                {item.name}
              </Box>
            </Box>
          );
        })}
      </Box>
    </AppCard>
  );
};

export default BtcVolumeCurrency;

BtcVolumeCurrency.defaultProps = {
  data: [],
};

BtcVolumeCurrency.propTypes = {
  data: PropTypes.array,
};
