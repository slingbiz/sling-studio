import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';

const MarketGraph = ({marketGraphData}) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={isBreakPointDown('xl') ? 300 : 260}>
      <BarChart barSize={40} barGap={3} data={marketGraphData}>
        <XAxis dataKey='month' axisLine={false} tickLine={false} />
        <YAxis hide />
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <Bar dataKey='low' stackId='a' fill='#319795' />
        <Bar dataKey='medium' stackId='a' fill='#4C51BF' />
        <Bar dataKey='high' stackId='a' fill='#E53E3E' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketGraph;

MarketGraph.defaultProps = {
  marketGraphData: [],
};

MarketGraph.propTypes = {
  marketGraphData: PropTypes.array,
};
