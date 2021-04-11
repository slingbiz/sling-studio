import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabForm from './TabForm';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import BtcVolumeCurrency from '../BtcVolumeCurrency';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  muiTabsRoot: {
    position: 'relative',
    marginTop: -8,
    marginLeft: -8,
    [theme.breakpoints.up('xl')]: {
      marginLeft: -20,
    },
  },
  muiTab: {
    fontSize: 16,
    textTransform: 'capitalize',
    padding: 0,
    marginLeft: 8,
    marginRight: 8,
    minWidth: 10,
    fontWeight: Fonts.BOLD,
    [theme.breakpoints.up('xl')]: {
      marginLeft: 20,
      marginRight: 20,
    },
  },
}));

const BuySell = (props) => {
  const {buySell} = props;

  const classes = useStyles(props);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  const {messages} = useIntl();
  return (
    <AppCard height='1' footer={messages['dashboard.buyNow']}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        aria-label='simple tabs example'
        className={classes.muiTabsRoot}>
        <Tab
          className={classes.muiTab}
          label={<IntlMessages id='common.buy' />}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.muiTab}
          label={<IntlMessages id='common.sell' />}
          {...a11yProps(1)}
        />
      </Tabs>
      {value === 0 && <TabForm data={buySell.buyData} />}
      {value === 1 && <TabForm data={buySell.sellData} />}
    </AppCard>
  );
};

export default BuySell;

BtcVolumeCurrency.defaultProps = {
  buySell: {
    buyData: {
      value: '',
      price: '',
      amount: '',
    },
    sellData: {
      value: '',
      price: '',
      amount: '',
    },
  },
};

BtcVolumeCurrency.propTypes = {
  buySell: PropTypes.object,
};
