import React from 'react';
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import PropTypes from 'prop-types';

const ProfileViewsGraph = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={100}>
      <BarChart barSize={13} data={data}>
        <XAxis dataKey='data' axisLine={false} tickLine={false} />
        <YAxis hide padding={{left: 0, right: 0}} />
        <Bar dataKey='number' fill='#E2E8F0' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfileViewsGraph;

ProfileViewsGraph.defaultProps = {
  data: [],
};

ProfileViewsGraph.propTypes = {
  data: PropTypes.array,
};
