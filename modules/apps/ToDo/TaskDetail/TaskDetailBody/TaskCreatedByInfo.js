import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TaskCreatedByInfo = ({createdBy, createdOn, classes}) => {
  return (
    <Box mb={5} display='flex' alignItems='center'>
      {createdBy.image ? (
        <Avatar src={createdBy.image} className={classes.avtr50} />
      ) : (
        <Avatar className={classes.avtr50}>{createdBy.name[0]}</Avatar>
      )}
      <Box
        ml={2}
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        alignItems={{sm: 'center'}}>
        <Box
          component='span'
          mr={2}
          color='primary.main'
          fontWeight={Fonts.MEDIUM}
          display='inline-block'>
          {createdBy.name}
        </Box>
        <Box component='p' mb={0}>
          <Box component='span'>
            <IntlMessages id='todo.createdThisTask' />
          </Box>
          <Box component='span' color={grey[500]} ml={2}>
            {createdOn}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCreatedByInfo;

TaskCreatedByInfo.prototype = {
  createdBy: PropTypes.object.isRequired,
  createdOn: PropTypes.string.isRequired,
};
