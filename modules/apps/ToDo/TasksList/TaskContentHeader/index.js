import React from 'react';
import Checkbox from '@material-ui/core/Checkbox/index';
import {useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import SearchBar from '../../../../../@crema/core/SearchBar';
import PropTypes from 'prop-types';
import {Hidden, makeStyles} from '@material-ui/core';
import SelectTasksDropdown from './SelectTasksDropdown';
import CheckedTasksActions from './CheckedTasksActions';
import AppsPagination from '../../../../../@crema/core/AppsPagination';
import {grey} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pagination: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  checkedTask: {
    borderLeft: `1px solid ${grey[300]}`,
  },
  option: {
    padding: 8,
    cursor: 'pointer',
  },
  deleteIcon: {
    marginRight: 16,
    cursor: 'pointer',
  },
  labelIcon: {
    marginRight: 12,
    cursor: 'pointer',
  },
  pointer: {
    cursor: 'pointer',
  },
  selectBox: {
    cursor: 'pointer',
    '& .MuiOutlinedInput-input': {
      paddingBottom: 10,
      paddingTop: 10,
    },
    '& .MuiSelect-select': {
      paddingLeft: 10,
    },
  },
}));

const TaskContentHeader = (props) => {
  const {
    checkedTasks,
    setCheckedTasks,
    filterText,
    onSetFilterText,
    onPageChange,
    page,
  } = props;

  const taskList = useSelector(({todoApp}) => todoApp.taskList);

  const totalTasks = useSelector(({todoApp}) => todoApp.totalTasks);

  const onHandleMasterCheckbox = (event) => {
    if (event.target.checked) {
      const taskIds = taskList.map((task) => task.id);
      setCheckedTasks(taskIds);
    } else {
      setCheckedTasks([]);
    }
  };

  const onSelectTasks = (value) => {
    switch (value) {
      case 0:
        const taskIds = taskList.map((task) => task.id);
        setCheckedTasks(taskIds);
        break;
      case 1:
        setCheckedTasks([]);
        break;

      case 2:
        const ids = taskList
          .filter((task) => task.isStarred)
          .map((task) => task.id);
        setCheckedTasks(ids);
        break;

      case 3:
        const idsToCheck = taskList
          .filter((task) => task.isAttachment)
          .map((task) => task.id);
        setCheckedTasks(idsToCheck);
        break;

      default:
        setCheckedTasks([]);
    }
  };

  const classes = useStyles(props);

  const {messages} = useIntl();

  return (
    <>
      <Box display='flex' flexDirection='row' flex={1} alignItems='center'>
        <Box mr={{xs: 1, xl: 2}} component='span'>
          <Checkbox
            color='primary'
            indeterminate={
              checkedTasks.length > 0 && checkedTasks.length < taskList.length
            }
            checked={
              taskList.length > 0 && checkedTasks.length === taskList.length
            }
            onChange={onHandleMasterCheckbox}
          />
        </Box>

        <SelectTasksDropdown onSelectTasks={onSelectTasks} classes={classes} />

        <Box mr={{sm: 4}} component='span' display='flex'>
          {checkedTasks.length > 0 ? (
            <CheckedTasksActions
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              page={page}
              classes={classes}
            />
          ) : null}
        </Box>

        <SearchBar
          overlap={false}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
          placeholder={messages['common.searchHere']}
        />
      </Box>
      <Hidden xsDown>
        {taskList.length > 0 ? (
          <AppsPagination
            className={classes.pagination}
            count={totalTasks}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>
    </>
  );
};

export default TaskContentHeader;

TaskContentHeader.defaultProps = {
  checkedTasks: [],
  filterText: '',
  page: 0,
};

TaskContentHeader.prototype = {
  checkedTasks: PropTypes.array,
  setCheckedTasks: PropTypes.func,
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
};
