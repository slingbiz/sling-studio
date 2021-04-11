import React from 'react';
import {makeStyles} from '@material-ui/core';
import ActiveUsersGraph from './ActiveUsersGraph';
import ExtraRevenueGraph from './ExtraRevenueGraph';
import TrafficRaiseGraph from './TrafficRaiseGraph';
import LessOrdersGraph from './LessOrdersGraph';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const ComparisonCard = ({
  data,
  text,
  bgColor,
  headingColor,
  valueColor,
  type,
}) => {
  const useStyles = makeStyles((theme) => ({
    containerRoot: {
      width: '100%',
    },
  }));

  const classes = useStyles();

  const onGetGraph = () => {
    switch (type) {
      case 'activeUsers':
        return <ActiveUsersGraph data={data.graphData} classes={classes} />;

      case 'extraRevenue':
        return <ExtraRevenueGraph data={data.graphData} classes={classes} />;

      case 'trafficRaise':
        return <TrafficRaiseGraph data={data.graphData} classes={classes} />;

      case 'lessOrders':
        return <LessOrdersGraph data={data.graphData} classes={classes} />;

      default:
        return <ActiveUsersGraph data={data.graphData} classes={classes} />;
    }
  };

  return (
    <AppCard bgcolor={bgColor} contentStyle={{padding: 0}}>
      <Box position='relative'>
        <Box py={5} px={6} position='absolute' top={0} left={0}>
          <Box
            component='p'
            mb={4}
            color={headingColor}
            fontWeight={Fonts.BOLD}
            fontSize={16}>
            {text}
          </Box>
          <Box
            component='h3'
            color={valueColor}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {data.value}
          </Box>
        </Box>
        <Box position='relative' mb={-4} pt={4}>
          {onGetGraph()}
        </Box>
      </Box>
    </AppCard>
  );
};

export default ComparisonCard;

ComparisonCard.defaultProps = {
  bgColor: '',
  data: {
    value: '',
    graphData: [],
  },
  type: '',
  headingColor: '',
  valueColor: '',
};

ComparisonCard.propTypes = {
  text: PropTypes.any.isRequired,
  bgColor: PropTypes.string,
  data: PropTypes.object,
  type: PropTypes.string,
  headingColor: PropTypes.string,
  valueColor: PropTypes.string,
};
