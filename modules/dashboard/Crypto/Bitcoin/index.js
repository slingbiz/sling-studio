import React, {useCallback, useEffect, useState} from 'react';
import Select from '@material-ui/core/Select';
import BitcoinGraph from './BitcoinGraph';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {Box, makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import {green, indigo} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const Bitcoin = (props) => {
  const {coinGraphData} = props;

  const useStyles = makeStyles((theme) => ({
    selectBox: {
      fontSize: 16,
      fontWeight: Fonts.BOLD,
      cursor: 'pointer',
      [theme.breakpoints.up('md')]: {
        marginRight: 8,
      },
      '& .MuiSelect-select': {
        paddingLeft: 10,
        paddingRight: 24,
      },
      '& .MuiSelect-icon': {
        width: 34,
        height: 34,
        fontSize: '2rem',
        top: 'calc(50% - 17px)',
      },
    },
    selectBoxOption: {
      cursor: 'pointer',
      padding: 12,
      fontSize: 14,
    },
    muiTabsRoot: {
      position: 'relative',
    },
    muiTab: {
      fontSize: 14,
      textTransform: 'capitalize',
      padding: 0,
      marginLeft: 4,
      marginRight: 4,
      minWidth: 10,
      [theme.breakpoints.up('sm')]: {
        marginLeft: 8,
        marginRight: 8,
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: 20,
        marginRight: 20,
      },
    },
  }));

  const classes = useStyles(props);

  const onGetCoinData = useCallback(
    (coin) => {
      switch (coin) {
        case 'Bitcoin': {
          return coinGraphData.bitcoin;
        }
        case 'Litecoin': {
          return coinGraphData.litecoin;
        }
        case 'Ripple': {
          return coinGraphData.ripple;
        }
        default:
          return coinGraphData.bitcoin;
      }
    },
    [coinGraphData],
  );

  const [graphType, setGraphType] = useState(0);
  const [coinType, setCoinType] = useState('Bitcoin');
  const [coinData, setCoinData] = useState(onGetCoinData(coinType));

  useEffect(() => {
    setCoinData(onGetCoinData(coinType));
  }, [coinType, onGetCoinData]);

  const handleChange = (event, newValue) => {
    setGraphType(newValue);
  };

  const handleSelectValue = (event) => {
    setCoinType(event.target.value);
  };

  const {messages} = useIntl();

  return (
    <AppCard>
      <Box
        mt={-2}
        display='flex'
        flexDirection={{xs: 'column', md: 'row'}}
        alignItems={{md: 'center'}}>
        <Box ml={-3} flex='1' display='flex' alignItems='center'>
          <Box display='inline-block'>
            <Select
              value={coinType}
              disableUnderline={true}
              onChange={handleSelectValue}
              className={classes.selectBox}>
              <option value='Bitcoin' className={classes.selectBoxOption}>
                {messages['dashboard.bitcoin']}
              </option>
              <option value='Litecoin' className={classes.selectBoxOption}>
                {messages['dashboard.litecoin']}
              </option>
              <option value='Ripple' className={classes.selectBoxOption}>
                {messages['dashboard.ripple']}
              </option>
            </Select>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box
              component='h3'
              mx={2}
              fontWeight={Fonts.MEDIUM}
              color={indigo[700]}
              fontSize={20}>
              $7280.45
            </Box>
            <Box
              component='span'
              mt={1}
              fontWeight={Fonts.MEDIUM}
              color={green[600]}
              fontSize={16}>
              0.8%
            </Box>
          </Box>
        </Box>
        <Box ml={{md: 'auto'}}>
          <Tabs
            className={classes.muiTabsRoot}
            value={graphType}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'>
            <Tab
              className={classes.muiTab}
              label={<IntlMessages id='common.yearly' />}
            />
            <Tab
              className={classes.muiTab}
              label={<IntlMessages id='common.monthly' />}
            />
            <Tab
              className={classes.muiTab}
              label={<IntlMessages id='common.weekly' />}
            />
            <Tab
              className={classes.muiTab}
              label={<IntlMessages id='common.today' />}
            />
          </Tabs>
        </Box>
      </Box>

      <Box ml={-3}>
        {graphType === 0 && (
          <BitcoinGraph data={coinData.yearlyData} value={graphType} />
        )}
        {graphType === 1 && (
          <BitcoinGraph data={coinData.monthlyData} value={graphType} />
        )}
        {graphType === 2 && (
          <BitcoinGraph data={coinData.weeklyData} value={graphType} />
        )}
        {graphType === 3 && (
          <BitcoinGraph data={coinData.dailyData} value={graphType} />
        )}
      </Box>
    </AppCard>
  );
};

export default Bitcoin;

Bitcoin.defaultProps = {
  coinGraphData: {
    bitcoin: {
      yearlyData: [],
      monthlyData: [],
      weeklyData: [],
      dailyData: [],
    },
    litecoin: {
      yearlyData: [],
      monthlyData: [],
      weeklyData: [],
      dailyData: [],
    },
    ripple: {
      yearlyData: [],
      monthlyData: [],
      weeklyData: [],
      dailyData: [],
    },
  },
};

Bitcoin.propTypes = {
  coinGraphData: PropTypes.object,
};
