import React, {useState} from 'react';
import OrdersGraph from './OrdersGraph';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import AppSelect from '../../../../@crema/core/AppSelect';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '& .select-box, & .MuiSelect-icon': {
      color: '#FFFFFF',
    },
    '& .recharts-label': {
      fill: '#FFFFFF',
    },
  },
}));

const Orders = ({data}) => {
  const [graphData, setGraphData] = useState(data.graphData.dataTwo);
  const {messages} = useIntl();

  const handleWeekChange = (value) => {
    switch (value) {
      case messages['dashboard.thisWeek']:
        setGraphData(data.graphData.dataOne);
        break;
      case messages['dashboard.lastWeeks']:
        setGraphData(data.graphData.dataTwo);
        break;
      case messages['dashboard.lastMonth']:
        setGraphData(data.graphData.dataThree);
        break;
      default:
        setGraphData(data.graphData.dataOne);
    }
  };

  const classes = useStyles();

  return (
    <AppCard
      height={1}
      title={messages['common.orders']}
      titleStyle={{color: '#FFFFFF'}}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleWeekChange}
        />
      }
      className={classes.root}
      footer={
        <Box
          width={1}
          mb={1}
          display='flex'
          alignItems='center'
          fontWeight={Fonts.MEDIUM}
          justifyContent='space-between'
          style={{textTransform: 'uppercase'}}>
          <Box component='p' color='#FFFFFF88' fontSize={14}>
            <IntlMessages id='common.revenue' />
            <Box ml={2} component='span' color='primary.contrastText'>
              {data.revenue}
            </Box>
          </Box>
          <Box component='p' color='#FFFFFF88' fontSize={14}>
            <IntlMessages id='common.orders' />
            <Box ml={2} component='span' color='primary.contrastText'>
              {data.orders}
            </Box>
          </Box>
        </Box>
      }>
      <OrdersGraph data={graphData} />
    </AppCard>
  );
};

export default Orders;

Orders.defaultProps = {
  data: {
    new: 0,
    returning: 0,
    graphData: {
      dataOne: [],
      dataTwo: [],
      dataThree: [],
    },
  },
};

Orders.propTypes = {
  data: PropTypes.object,
};
