import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {useDispatch, useSelector} from 'react-redux';
import {onUpdateSelectedTask} from '../../../../../redux/actions';
import PropTypes from 'prop-types';

const TaskPriority = ({inputLabel, labelWidth, selectedTask, classes}) => {
  const dispatch = useDispatch();
  const priorityList = useSelector(({todoApp}) => todoApp.priorityList);

  const [priority, setPriority] = useState(selectedTask.priority);

  const onChangePriority = (event) => {
    setPriority(event.target.value);
    const task = selectedTask;
    task.priority = event.target.value;
    dispatch(onUpdateSelectedTask(task));
  };

  return (
    <FormControl variant='outlined'>
      <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
        <IntlMessages id='common.priority' />
      </InputLabel>
      <Select
        labelWidth={labelWidth}
        name='priority'
        value={priority.type}
        onChange={(event) => onChangePriority(event)}
        className={classes.selectBox}>
        {priorityList.map((priority) => {
          return (
            <option
              key={priority.id}
              value={priority.type}
              className={classes.option}>
              {priority.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskPriority;

TaskPriority.defaultProps = {
  inputLabel: null,
  labelWidth: 0,
};

TaskPriority.prototype = {
  selectedTask: PropTypes.object.isRequired,
  inputLabel: PropTypes.object,
  labelWidth: PropTypes.number,
};
