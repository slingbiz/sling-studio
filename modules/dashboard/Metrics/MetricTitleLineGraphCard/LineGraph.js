import React from 'react';
import {Line, LineChart} from 'recharts';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const LineGraph = (props) => {
  const {data, graphColor} = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: 8,
    },
  }));
  const classes = useStyles(props);

  return (
    <Box ml='auto'>
      <LineChart className={classes.root} width={300} height={40} data={data}>
        <Line
          type='monotone'
          dataKey='value'
          stroke={graphColor}
          strokeWidth={5}
          dot={false}
        />
      </LineChart>

      <LineChart width={300} height={40} data={data}>
        <Line
          type='monotone'
          dataKey='value'
          stroke={graphColor}
          strokeWidth={5}
          dot={false}
          strokeDasharray='5 5'
        />
      </LineChart>
    </Box>
  );
};

export default LineGraph;

LineGraph.defaultProps = {
  data: [],
  graphColor: '',
};

LineGraph.propTypes = {
  data: PropTypes.array,
  graphColor: PropTypes.string,
};
