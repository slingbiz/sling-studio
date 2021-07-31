import React from 'react';
import PropTypes from 'prop-types';
import {Loader} from '../../index';

const Suspense = (props) => {
  return (
    <React.Suspense fallback={<Loader />}>{props.children}</React.Suspense>
  );
};

Suspense.propTypes = {
  loadingProps: PropTypes.object,
};

Suspense.defaultProps = {
  loadingProps: {
    delay: 300,
  },
};

export default Suspense;

Suspense.propTypes = {
  children: PropTypes.node.isRequired,
};
