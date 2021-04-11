import React, {useContext} from 'react';
import {createRipples} from 'react-ripples';

import AppContext from '../../utility/AppContext';
import PropTypes from 'prop-types';

const Ripple = ({children}) => {
  const {theme} = useContext(AppContext);

  const RippleEffect = createRipples({
    color: theme.palette.primary.main,
    during: 2200,
  });

  return <RippleEffect>{children}</RippleEffect>;
};

export default Ripple;

Ripple.propTypes = {
  children: PropTypes.node.isRequired,
};
