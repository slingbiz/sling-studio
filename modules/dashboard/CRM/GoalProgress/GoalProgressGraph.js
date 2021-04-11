import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  goalChart: {
    height: '320px !important',
  },
}));
const GoalProgressGraph = (props) => {
  const classes = useStyles(props);

  const {progressGraphData} = props;

  return (
    <ResponsiveContainer className={classes.goalChart}>
      <BarChart
        barGap={5}
        barSize={25}
        data={progressGraphData}
        margin={{top: 50}}>
        <XAxis dataKey='name' axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip labelStyle={{color: 'black'}} />
        <Bar dataKey='progress' stackId='a' fill='#3182CE' />
        <Bar dataKey='actual' stackId='a' fill='#E53E3E' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GoalProgressGraph;

GoalProgressGraph.defaultProps = {
  progressGraphData: [],
};

GoalProgressGraph.propTypes = {
  progressGraphData: PropTypes.array,
};
