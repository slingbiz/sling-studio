import React, {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {onCreateTask} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import {Scrollbar} from '../../../../@crema';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import AddTaskForm from './AddTaskForm';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 'auto',
    padding: '20px 32px',
  },
  scrollRoot: {
    paddingTop: 4,
    height: 520,
  },
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 900,
      width: '100%',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  title: yup.string().required(<IntlMessages id='validation.titleRequired' />),
});

const AddNewTask = (props) => {
  const {isAddTaskOpen, onCloseAddTask} = props;

  const dispatch = useDispatch();

  const user = useAuthUser();

  const [taskLabels, setTaskLabels] = useState([]);

  const classes = useStyles(props);

  return (
    <Dialog
      open={isAddTaskOpen}
      onClose={() => onCloseAddTask()}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Box component='h5' pt={6} px={8} mb={0} fontWeight={Fonts.LIGHT}>
        <IntlMessages id='todo.addNewTask' />
      </Box>

      <Scrollbar className={classes.scrollRoot}>
        <Formik
          validateOnChange={true}
          initialValues={{
            title: '',
            assignedTo: '',
            label: [],
            priority: 3,
            date: moment().format('MM/DD/YYYY'),
            content: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            const newTask = {
              id: Math.floor(Math.random() * 1000000),
              isStarred: false,
              isAttachment: false,
              sentAt: '10.30am',
              isRead: true,
              folderValue: 120,
              createdBy: {
                name: user.displayName ? user.displayName : 'User',
                image: user.photoURL,
              },
              schedule: moment(data.date).format('lll'),
              image: '/assets/images/dummy2.jpg',
              createdOn: moment().format('ll'),
              status: 1,
              comments: [],
              ...data,
              label: taskLabels,
            };
            dispatch(onCreateTask(newTask));
            onCloseAddTask();
            resetForm();
            setSubmitting(false);
          }}>
          {({isSubmitting, values, setFieldValue}) => (
            <AddTaskForm
              isSubmitting={isSubmitting}
              values={values}
              setFieldValue={setFieldValue}
              setTaskLabels={setTaskLabels}
              taskLabels={taskLabels}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default AddNewTask;

AddNewTask.prototype = {
  isAddTaskOpen: PropTypes.bool.isRequired,
  onCloseAddTask: PropTypes.func.isRequired,
};
