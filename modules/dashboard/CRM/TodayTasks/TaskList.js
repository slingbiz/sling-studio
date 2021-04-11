import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';
import AppList from '../../../../@crema/core/AppList';
import clsx from 'clsx';

const getData = (data) => {
  if (isBreakPointDown('xl')) {
    return data.slice(0, 5);
  } else {
    return data.slice(0, 6);
  }
};

const TaskList = (props) => {
  const {todayTaskData} = props;
  const [taskList, handleList] = useState(getData(todayTaskData));

  const handleChange = (e, task) => {
    task.isChecked = e.target.checked;
    const list = taskList.map((item) => (item.id === task.id ? task : item));
    handleList(list);
  };

  const useStyles = makeStyles((theme) => ({
    listIcon: {
      marginTop: -8,
      minWidth: 0,
      width: 35,
      [theme.breakpoints.up('xl')]: {
        width: 40,
      },
    },
    listItemRoot: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 8,
      paddingBottom: 8,
    },
  }));

  const classes = useStyles(props);

  return (
    <List>
      <AppList
        data={taskList}
        renderRow={(task) => {
          return (
            <ListItem
              key={task.id}
              className={clsx(classes.listItemRoot, 'item-hover')}>
              <ListItemIcon className={classes.listIcon}>
                <Box mr={2} ml={-2}>
                  <Checkbox
                    color='primary'
                    checked={task.isChecked}
                    onChange={(e) => handleChange(e, task)}
                  />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box
                    component='span'
                    fontWeight={Fonts.MEDIUM}
                    fontSize={14}
                    color={task.isChecked ? 'text.secondary' : 'text.primary'}>
                    {task.task}
                  </Box>
                }
                secondary={
                  <Box component='span' fontSize={12}>
                    <IntlMessages id='common.scheduled' /> {task.date}
                  </Box>
                }
              />
            </ListItem>
          );
        }}
      />
    </List>
  );
};

export default TaskList;

TaskList.defaultProps = {
  todayTaskData: [],
};

TaskList.propTypes = {
  todayTaskData: PropTypes.array,
};
