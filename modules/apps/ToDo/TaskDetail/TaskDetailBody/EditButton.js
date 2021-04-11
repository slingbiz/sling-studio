import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const EditButton = ({classes, action, title}) => {
  return (
    <Box
      px={4}
      py={2}
      component='span'
      bgcolor='red'
      color='primary.contrastText'
      fontWeight={Fonts.LIGHT}
      display='inline-block'
      cursor='pointer'
      className={clsx(classes.taskBtn, classes.pointer)}
      onClick={action}>
      {title}
    </Box>
  );
};

export default EditButton;

EditButton.prototype = {
  title: PropTypes.any.isRequired,
  action: PropTypes.func,
};
