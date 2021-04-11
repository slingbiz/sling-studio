import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import data from './data';
import Box from '@material-ui/core/Box';

const LineChartConnectNulls = () => (
  <ResponsiveContainer width='100%' height={600}>
    <div>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <LineChart
            data={data}
            margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='uv'
              stroke='#4299E1'
              fill='#4299E1'
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <LineChart
            data={data}
            margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Line
              connectNulls={true}
              type='monotone'
              dataKey='uv'
              stroke='#4299E1'
              fill='#4299E1'
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </div>
  </ResponsiveContainer>
);

export default LineChartConnectNulls;
