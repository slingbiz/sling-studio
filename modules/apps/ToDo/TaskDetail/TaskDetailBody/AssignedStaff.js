import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const AssignedStaff = ({assignedStaff, classes}) => {
  return (
    <>
      {assignedStaff ? (
        <Box mr={4} display='flex' alignItems='center'>
          {assignedStaff.image ? (
            <Avatar className={classes.avtr50} src={assignedStaff.image} />
          ) : (
            <Avatar className={classes.avtr50}>{assignedStaff.name[0]}</Avatar>
          )}
          <Box ml={4}>
            <Box component='p' mb={0.5}>
              <IntlMessages id='todo.assignedTo' />
            </Box>
            <Box
              component='p'
              mb={0}
              color='primary.main'
              fontWeight={Fonts.MEDIUM}>
              {assignedStaff.name}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mr={4} display='flex' alignItems='center'>
          <Avatar
            className={classes.avtr50}
            src={'/assets/images/placeholder.jpg'}
          />
          <Box ml={4}>
            <Box
              component='p'
              mb={0}
              fontWeight={Fonts.MEDIUM}
              color='primary.main'>
              <IntlMessages id='todo.currentlyUnassigned' />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AssignedStaff;

AssignedStaff.defaultProps = {
  assignedStaff: null,
};

AssignedStaff.prototype = {
  assignedStaff: PropTypes.object,
};
