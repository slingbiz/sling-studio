import React from 'react';
import GridView from './GridView';
import PropTypes from 'prop-types';
import GridFooter from './GridFooter';

const AppGrid = ({footerProps, ...rest}) => {
  return (
    <GridView
      {...rest}
      ListFooterComponent={
        footerProps ? (
          <GridFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

export default AppGrid;
AppGrid.propTypes = {
  loading: PropTypes.bool,
  border: PropTypes.bool,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
};
AppGrid.defaultProps = {
  loading: false,
  border: false,
  data: [],
};
