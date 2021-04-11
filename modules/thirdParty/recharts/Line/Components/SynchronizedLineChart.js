import React from 'react';
import {
  Area,
  AreaChart,
  Brush,
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

const SynchronizedLineChart = () => (
  <ResponsiveContainer width='100%' height={700}>
    <Box>
      <Box textAlign='center' component='p'>
        A demo of synchronized AreaCharts
      </Box>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <LineChart
            data={data}
            syncId='anyId'
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
      <Box textAlign='center' component='p'>
        Maybe some other content
      </Box>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <LineChart
            data={data}
            syncId='anyId'
            margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='pv'
              stroke='#4299E1'
              fill='#4299E1'
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart
            data={data}
            syncId='anyId'
            margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='pv'
              stroke='#4299E1'
              fill='#4299E1'
            />
            <Brush />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  </ResponsiveContainer>
);

export default SynchronizedLineChart;
