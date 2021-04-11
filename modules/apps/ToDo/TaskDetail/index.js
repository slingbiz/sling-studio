import React, {useEffect} from 'react';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailBody from './TaskDetailBody';
import {useDispatch, useSelector} from 'react-redux';
import {onGetSelectedTask} from '../../../../redux/actions';
import {useRouter} from 'next/router';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../../@crema/core/AppsContainer/AppsContent';

const TaskDetail = () => {
  const dispatch = useDispatch();

  const {query} = useRouter();
  const id = query.all[1];

  useEffect(() => {
    dispatch(onGetSelectedTask(id));
  }, [dispatch, id]);

  const selectedTask = useSelector(({todoApp}) => todoApp.selectedTask);
  console.log('selectedTask', selectedTask);
  if (!selectedTask) {
    return null;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader selectedTask={selectedTask} />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody selectedTask={selectedTask} />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
