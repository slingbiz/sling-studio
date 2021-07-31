import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {jssPreset, StylesProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const SlingStyleProvider = (props) => {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
};
export default SlingStyleProvider;

SlingStyleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
