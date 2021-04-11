import React, {useEffect} from 'react';
import TaskSideBar from './TaskSideBar/index';
import TasksList from './TasksList';
import TaskDetail from './TaskDetail';
import {useDispatch} from 'react-redux';
import {
  onGetToDoFolderList,
  onGetToDoLabelList,
  onGetToDoPriorityList,
  onGetToDoStaffList,
  onGetToDoStatusList,
} from '../../../redux/actions';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {withRouter} from 'next/router';

const ToDo = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetToDoLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoPriorityList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStaffList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStatusList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (+props.router.query.all[1] > 0) {
      return <TaskDetail />;
    } else {
      return <TasksList />;
    }
  };

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['todo.todoApp']}
      sidebarContent={<TaskSideBar />}>
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default withRouter(ToDo);

ToDo.defaultProps = {
  match: null,
};

ToDo.prototype = {
  match: PropTypes.node,
};
