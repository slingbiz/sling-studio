import React from 'react';
import Grid from '@material-ui/core/Grid';
import {isBreakPointDown} from '../../utility/Utils';
import PropTypes from 'prop-types';

const GridContainer = ({children, ...others}) => {
  return (
    <Grid container spacing={isBreakPointDown('md') ? 4 : 8} {...others}>
      {children}
    </Grid>
  );
};

export default GridContainer;

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
