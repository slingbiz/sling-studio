import React from 'react';
import {useDispatch} from 'react-redux';
import {onUpdateSelectedTask} from '../../../../../redux/actions';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core';import { useRouter } from 'next/router'
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppsStarredIcon from '../../../../../@crema/core/AppsStarredIcon';
import StatusToggleButton from './StatusToggleButton';
import AppsDeleteIcon from '../../../../../@crema/core/AppsDeleteIcon';

const TaskDetailHeader = (props) => {
  const {selectedTask} = props;
  const dispatch = useDispatch();

  const router = useRouter();

  const onClickBackButton = () => {
    router.back();
  };

  const onChangeStarred = (checked) => {
    const task = selectedTask;
    task.isStarred = checked;
    dispatch(onUpdateSelectedTask(task));
  };

  const onDeleteTask = () => {
    const task = selectedTask;
    task.folderValue = 126;
    dispatch(onUpdateSelectedTask(task));
    router.back();
  };

  const useStyles = makeStyles((theme) => ({
    statusBtn: {
      fontSize: 12,
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      cursor: 'pointer',
      [theme.breakpoints.up('lg')]: {
        fontSize: 14,
      },
    },
    deleteIcon: {
      marginLeft: 'auto',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 16,
      },
    },
    doneIcon: {
      marginRight: 4,
      fontSize: 18,
      verticalAlign: 'middle',
      [theme.breakpoints.up('sm')]: {
        marginRight: 8,
      },
    },
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      <Box className={classes.pointer} component='span'>
        <Tooltip title={<IntlMessages id='common.back' />}>
          <KeyboardBackspaceIcon onClick={onClickBackButton} />
        </Tooltip>
      </Box>

      <StatusToggleButton selectedTask={selectedTask} classes={classes} />

      <Box component='span' ml='auto' display={{xs: 'none', sm: 'block'}}>
        <AppsStarredIcon item={selectedTask} onChange={onChangeStarred} />
      </Box>

      <AppsDeleteIcon
        deleteAction={onDeleteTask}
        deleteTitle={<IntlMessages id='todo.deleteMessage' />}
        className={classes.deleteIcon}
      />
    </>
  );
};

export default TaskDetailHeader;

TaskDetailHeader.prototype = {
  selectedTask: PropTypes.object.isRequired,
};
