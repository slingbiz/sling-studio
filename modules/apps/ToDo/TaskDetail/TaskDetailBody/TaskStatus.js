import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {useDispatch, useSelector} from 'react-redux';
import {onUpdateSelectedTask} from '../../../../../redux/actions';
import PropTypes from 'prop-types';
import CommentsList from './CommentsList';

const TaskStatus = ({inputLabel, labelWidth, selectedTask, classes}) => {
  const statusList = useSelector(({todoApp}) => todoApp.statusList);

  const dispatch = useDispatch();

  const onChangeStatus = (event) => {
    const task = selectedTask;
    task.status = event.target.value;
    dispatch(onUpdateSelectedTask(task));
  };

  return (
    <FormControl className='' variant='outlined'>
      <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
        <IntlMessages id='common.status' />
      </InputLabel>
      <Select
        labelWidth={labelWidth}
        value={selectedTask.status}
        onChange={(event) => onChangeStatus(event)}
        className={classes.selectBox}>
        {statusList.map((status) => {
          return (
            <option
              key={status.type}
              value={status.type}
              className={classes.option}>
              {status.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskStatus;

TaskStatus.defaultProps = {
  inputLabel: null,
  labelWidth: 0,
};

CommentsList.prototype = {
  selectedTask: PropTypes.object.isRequired,
  inputLabel: PropTypes.object,
  labelWidth: PropTypes.number,
};
