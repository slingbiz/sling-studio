import React from 'react';
import PropTypes from 'prop-types';
import {Loader} from '../../index';

const AppSuspense = (props) => {
  return (
    <React.Suspense fallback={<Loader {...props.loadingProps} />}>
      {props.children}
    </React.Suspense>
  );
};

AppSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

AppSuspense.defaultProps = {
  loadingProps: {
    delay: 300,
  },
};

export default AppSuspense;

AppSuspense.propTypes = {
  children: PropTypes.node.isRequired,
};
