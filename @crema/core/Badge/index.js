import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 7px',
    fontSize: 11,
    fontWeight: 600,
    height: 20,
    minWidth: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.contrastText,
  },
}));

function Badge({className, count, color}) {
  const classes = useStyles();
  if (color === 'primary') {
    color = 'primary.main';
  } else if (color === 'v') {
    color = 'secondary.main';
  }
  return (
    <Box bgcolor={color} className={clsx(classes.root, className)}>
      {count}
    </Box>
  );
}

Badge.propTypes = {
  count: PropTypes.any,
  color: PropTypes.string,
};
Badge.defaultProps = {
  color: 'secondary.main',
};

export default React.memo(Badge);
