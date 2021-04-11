import React from 'react';
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import PropTypes from 'prop-types';

const OrdersGraph = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <BarChart barSize={20} data={data}>
        <XAxis dataKey='number' hide />
        <YAxis hide padding={{left: 0, right: 0}} />
        <Bar
          dataKey='value'
          fill='#FFFFFF'
          label={{position: 'top', color: 'white'}}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersGraph;

OrdersGraph.defaultProps = {
  data: [],
};

OrdersGraph.propTypes = {
  data: PropTypes.array,
};
