import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {Checkbox, Hidden, makeStyles} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {useRouter} from 'next/router';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Labels from './Labels';
import Priority from './Priority';
import AppsStarredIcon from '../../../../../@crema/core/AppsStarredIcon';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  listItemRoot: {
    '&.checked': {
      backgroundColor: grey[200],
      fontWeight: Fonts.LIGHT,
    },
  },
  listItemLeft: {
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  listItemRight: {
    width: '10%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
}));

const TaskListItem = ({
  task,
  onChangeCheckedTasks,
  checkedTasks,
  onChangeStarred,
}) => {
  const router = useRouter();

  const onViewTaskDetail = task => {
    router.push(`/apps/todo/${router.query.all[0]}/${task.id}`);
  };

  const classes = useStyles();

  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      cursor='pointer'
      className='item-hover'
      py={{xs: 1, xl: 2}}
      px={5}
      color={grey[600]}
      clone>
      <ListItem
        dense
        button
        key={task.id}
        className={clsx(classes.listItemRoot, {
          checked: checkedTasks.includes(task.id),
        })}
        onClick={() => onViewTaskDetail(task)}>
        <Box
          display='flex'
          alignItems='center'
          className={classes.listItemLeft}>
          <Box
            mr={3}
            component='span'
            onClick={event => event.stopPropagation()}>
            <Checkbox
              checked={checkedTasks.includes(task.id)}
              onChange={event => onChangeCheckedTasks(event, task.id)}
              color='primary'
            />
          </Box>

          <Box mr={3} component='span' className={classes.truncate}>
            {task.title}
          </Box>

          <Box component='span' display='flex' alignItems='Center'>
            <Labels labels={task.label} />
          </Box>

          <Hidden smDown>
            <Priority priority={task.priority} />
          </Hidden>
        </Box>

        <Box
          className={classes.listItemRight}
          display='flex'
          alignItems='Center'
          justifyContent={{sm: 'flex-end'}}
          pl={{sm: 3}}>
          <Hidden smDown>
            <Box width={42} textAlign='center' component='span'>
              {task.isAttachment ? <AttachFileIcon /> : null}
            </Box>
          </Hidden>

          <Hidden smDown>
            <Box component='span' ml={3} className={classes.truncate}>
              <IntlMessages id='todo.scheduleFor' /> {task.schedule}
            </Box>
          </Hidden>

          <Hidden smDown>
            <Box
              component='span'
              ml={{xs: 'auto', sm: 3}}
              onClick={event => event.stopPropagation()}>
              <AppsStarredIcon item={task} onChange={onChangeStarred} />
            </Box>
          </Hidden>
          <Box ml={1}>
            <Avatar src={task.image} />
          </Box>
        </Box>
      </ListItem>
    </Box>
  );
};

export default TaskListItem;

TaskListItem.defaultProps = {
  checkedTasks: [],
};

TaskListItem.prototype = {
  task: PropTypes.object.isRequired,
  onChangeCheckedTasks: PropTypes.func,
  checkedTasks: PropTypes.array,
  onChangeStarred: PropTypes.func,
};
