import React from 'react';
import Box from '@material-ui/core/Box';
import DoneIcon from '@material-ui/icons/Done';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import {onUpdateSelectedTask} from '../../../../../redux/actions';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const StatusToggleButton = ({selectedTask, classes}) => {
  const dispatch = useDispatch();

  const onChangeTaskStatus = (status) => {
    const task = selectedTask;
    task.status = status;
    dispatch(onUpdateSelectedTask(task));
  };

  return (
    <>
      {selectedTask.status === 3 ? (
        <Box
          ml={{xs: 2, sm: 4}}
          px={4}
          py={2}
          bgcolor='primary.main'
          component='span'
          color='primary.contrastText'
          fontWeight={Fonts.MEDIUM}
          className={classes.statusBtn}
          onClick={() => onChangeTaskStatus(1)}>
          <DoneIcon className={classes.doneIcon} />
          <IntlMessages id='todo.completed' />
        </Box>
      ) : (
        <Box
          ml={{xs: 2, sm: 4}}
          px={4}
          py={2}
          color='primary.main'
          component='span'
          fontWeight={Fonts.LIGHT}
          className={classes.statusBtn}
          onClick={() => onChangeTaskStatus(3)}>
          <DoneIcon className={classes.doneIcon} />
          <IntlMessages id='todo.markAsCompleted' />
        </Box>
      )}
    </>
  );
};

export default StatusToggleButton;

StatusToggleButton.prototype = {
  selectedTask: PropTypes.object.isRequired,
};
