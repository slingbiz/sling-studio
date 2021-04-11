import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onUpdateSelectedTask} from '../../../../../redux/actions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {useAuthUser} from '../../../../../@crema/utility/AppHooks';
import {makeStyles} from '@material-ui/core';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import Labels from '../../TasksList/TaskListItem/Labels';
import ChangeStaff from './ChangeStaff';
import AssignedStaff from './AssignedStaff';
import DatePicker from './DatePicker';
import EditButton from './EditButton';
import TaskStatus from './TaskStatus';
import TaskPriority from './TaskPriority';
import TaskCreatedByInfo from './TaskCreatedByInfo';
import CommentsList from './CommentsList';
import {red} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import TextField from '@material-ui/core/TextField';

const TaskDetailBody = (props) => {
  const {selectedTask} = props;

  const dispatch = useDispatch();

  const authUser = useAuthUser();

  const staffList = useSelector(({todoApp}) => todoApp.staffList);

  const [isEdit, setEdit] = useState(false);

  const [content, setContent] = useState(selectedTask.content);

  const [comment, setComment] = useState('');

  const [scheduleDate, setScheduleDate] = useState(
    moment(selectedTask.schedule).format('YYYY/MM/DD'),
  );

  const [selectedStaff, setStaff] = useState(selectedTask.assignedTo);

  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(60);
  }, []);

  const onClickEditButton = () => {
    setEdit(true);
  };

  const onDoneEditing = () => {
    const task = selectedTask;
    task.content = content;
    task.schedule = scheduleDate;
    task.assignedTo = selectedStaff;
    dispatch(onUpdateSelectedTask(task));
    setEdit(!isEdit);
  };

  const onAddComments = () => {
    let task = selectedTask;
    task.comments = task.comments.concat({
      comment: comment,
      name: authUser.displayName ? authUser.displayName : 'User',
      image: authUser.photoURL,
      date: moment().format('ll'),
    });
    dispatch(onUpdateSelectedTask(task));
    setComment('');
  };

  const handleStaffChange = (event) => {
    const staff = staffList.find((staff) => staff.id === event.target.value);
    setStaff(staff);
  };

  const useStyles = makeStyles((theme) => ({
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
    taskBtn: {
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
    },
    pointer: {
      cursor: 'pointer',
    },
    mr12: {
      marginRight: 12,
    },
    minWidth100: {
      minWidth: 100,
      width: '100%',
    },
    avtr50: {
      height: 50,
      width: 50,
    },
    datePicker: {
      marginTop: 0,
    },
    divider: {
      marginTop: 20,
      marginBottom: 20,
    },
    textArea: {
      width: '100%',
      marginBottom: 16,
    },
    option: {
      padding: 8,
      cursor: 'pointer',
    },
    button: {
      backgroundColor: red[500],
      color: theme.palette.primary.contrastText,
      fontWeight: Fonts.LIGHT,
      paddingRight: 20,
      paddingLeft: 20,
      '&:hover, &:focus': {
        backgroundColor: red[700],
        color: theme.palette.secondary.contrastText,
      },
    },
  }));

  const classes = useStyles(props);

  const {messages} = useIntl();

  return (
    <Box px={6} py={8}>
      <Box
        mb={6}
        display='flex'
        flexDirection={{xs: 'column', sm: 'row'}}
        alignItems={{sm: 'center'}}>
        <Box
          component='h2'
          mr={5}
          mb={{xs: 3, sm: 0}}
          fontSize={16}
          fontWeight={Fonts.BOLD}>
          {selectedTask.title}
        </Box>

        <Box display='flex' alignItems='center'>
          <Labels labels={selectedTask.label} />

          <Box
            component='span'
            ml={4}
            px={3}
            py={1}
            color='primary.contrastText'
            bgcolor={selectedTask.priority.color}
            fontSize={14}
            className={classes.taskBtn}>
            {selectedTask.priority.name}
          </Box>
        </Box>
      </Box>

      <Box mb={5} display='flex'>
        <Box
          display='flex'
          flexDirection={{xs: 'column', sm: 'row'}}
          mr={2}
          alignItems={{sm: 'center'}}>
          {isEdit ? (
            <>
              <Box mb={{xs: 3, sm: 0}}>
                <ChangeStaff
                  classes={classes}
                  inputLabel={inputLabel}
                  labelWidth={labelWidth}
                  selectedStaff={selectedStaff}
                  handleStaffChange={handleStaffChange}
                />
              </Box>
              <DatePicker
                classes={classes}
                scheduleDate={scheduleDate}
                setScheduleDate={setScheduleDate}
              />
            </>
          ) : (
            <AssignedStaff
              classes={classes}
              assignedStaff={selectedTask.assignedTo}
            />
          )}
        </Box>

        <Box ml='auto'>
          {!isEdit ? (
            <Box mt={2}>
              <EditButton
                classes={classes}
                action={onClickEditButton}
                title={<IntlMessages id='common.edit' />}
              />
            </Box>
          ) : (
            <EditButton
              classes={classes}
              action={onDoneEditing}
              title={<IntlMessages id='common.done' />}
            />
          )}
        </Box>
      </Box>

      <Divider className={classes.divider} />

      {!isEdit ? (
        <Box component='p' fontSize={{xs: 14, xl: 16}}>
          {content}
        </Box>
      ) : (
        <TextField
          multiline
          className={classes.textArea}
          rows='6'
          variant='outlined'
          placeholder={messages['common.description']}
          name='content'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      )}

      <Box mb={5} pt={5} display='flex' alignItems='center'>
        <Box mr={5}>
          <TaskStatus
            inputLabel={inputLabel}
            labelWidth={labelWidth}
            selectedTask={selectedTask}
            classes={classes}
          />
        </Box>

        <TaskPriority
          inputLabel={inputLabel}
          labelWidth={labelWidth}
          classes={classes}
          selectedTask={selectedTask}
        />
      </Box>

      <Divider className={classes.divider} />

      <TaskCreatedByInfo
        classes={classes}
        createdBy={selectedTask.createdBy}
        createdOn={selectedTask.createdOn}
      />

      <CommentsList classes={classes} comments={selectedTask.comments} />

      <TextField
        multiline
        className={classes.textArea}
        rows='6'
        variant='outlined'
        placeholder={messages['common.writeComment']}
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <Button className={classes.button} onClick={onAddComments}>
        <IntlMessages id='todo.submitComment' />
      </Button>
    </Box>
  );
};

export default TaskDetailBody;

TaskDetailBody.prototype = {
  selectedTask: PropTypes.object.isRequired,
};
