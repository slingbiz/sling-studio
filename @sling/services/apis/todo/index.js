import mock from '../../MockConfig';
import {staffList} from '../../db/apps/todo/staffList';
import priorityList from '../../db/apps/todo/priorityList';
import todoList from '../../db/apps/todo/todoList';
import folderList from '../../db/apps/todo/folderList';
import {labelList, onGetLabel} from '../../db/apps/todo/labelList';
import statusList from '../../db/apps/todo/statusList';

let todoData = todoList;

const onGetTaskList = (name, data) => {
  switch (name) {
    case 'all': {
      return data.filter((task) => task.folderValue !== 126);
    }

    case 'starred': {
      return data.filter((task) => task.folderValue !== 126 && task.isStarred);
    }

    case 'priority': {
      return data.filter(
        (task) => task.folderValue !== 126 && task.priority === 1,
      );
    }

    case 'scheduled': {
      const folderId = folderList.find((folder) => folder.alias === name).id;
      return data.filter((task) => task.folderValue === folderId);
    }

    case 'today': {
      const folderId = folderList.find((folder) => folder.alias === name).id;
      return data.filter((task) => task.folderValue === folderId);
    }

    case 'completed': {
      return data.filter(
        (task) => task.folderValue !== 126 && task.status === 3,
      );
    }

    case 'deleted': {
      return data.filter((task) => task.folderValue === 126);
    }
    default: {
      return data;
    }
  }
};

mock.onGet('/api/todo/task/list').reply((config) => {
  const params = config.params;
  let folderTaskList = [];
  if (params.type === 'folder') {
    folderTaskList = onGetTaskList(params.name, todoData);
  } else {
    const labelType = labelList.find((label) => label.alias === params.name).id;
    folderTaskList = todoData.filter((task) => {
      const label = task.label.find((label) => label.id === labelType);
      if (label && task.folderValue !== 126) {
        return task;
      } else return null;
    });
  }
  const index = params.page * 15;
  const total = folderTaskList.length;
  const list =
    folderTaskList.length > 15
      ? folderTaskList.slice(index, index + 15)
      : folderTaskList;
  return [200, {list, total}];
});

mock.onGet('/api/todoApp/task/').reply((config) => {
  const params = config.params;
  const response = todoData.find((task) => task.id === parseInt(params.id));
  return [200, response];
});

mock.onPut('/api/todoApp/task/').reply((request) => {
  const {task} = JSON.parse(request.data);
  // task.assignedTo = staffList.find(staff => staff.id === task.assignedTo);
  todoData = todoData.map((item) => (item.id === task.id ? task : item));
  return [200, task];
});

mock.onGet('/api/todo/folders/list').reply(200, folderList);

mock.onGet('/api/todo/labels/list').reply(200, labelList);

mock.onGet('/api/todo/staff/list').reply(200, staffList);

mock.onGet('/api/todo/priority/list').reply(200, priorityList);

mock.onGet('/api/todo/status/list').reply(200, statusList);

mock.onPut('/api/todo/update/starred').reply((request) => {
  const {taskIds, status} = JSON.parse(request.data);
  todoData = todoData.map((task) => {
    if (taskIds.includes(task.id)) {
      task.isStarred = !!status;
      return task;
    } else {
      return task;
    }
  });
  return [200, taskIds];
});

mock.onPut('/api/todo/update/label').reply((request) => {
  const {taskIds, type} = JSON.parse(request.data);
  todoData = todoData.map((task) => {
    if (taskIds.includes(task.id)) {
      if (task.label.includes(type)) {
        task.label = task.label.filter((label) => label !== type);
        return task;
      } else {
        task.label = task.label.concat(onGetLabel(type));
        return task;
      }
    } else {
      return task;
    }
  });
  const updatedTasks = todoData.filter((task) => taskIds.includes(task.id));
  return [200, updatedTasks];
});

mock.onPut('/api/todo/update/folder').reply((request) => {
  const {taskIds, type, name, page} = JSON.parse(request.data);
  todoData = todoData.map((task) => {
    if (taskIds.includes(task.id)) {
      task.folderValue = 126;
      return task;
    } else {
      return task;
    }
  });
  let folderTaskList = [];
  if (type === 'folder') {
    folderTaskList = onGetTaskList(name, todoData);
  } else {
    const labelType = labelList.find((label) => label.alias === name).id;
    folderTaskList = todoData.filter((task) => {
      const label = task.label.find((label) => label.id === labelType);
      if (label && task.folderValue !== 126) {
        return task;
      } else return null;
    });
  }
  const index = page * 15;
  const total = folderTaskList.length;
  const list =
    folderTaskList.length > 15
      ? folderTaskList.slice(index, index + 15)
      : folderTaskList;
  return [200, {list, total}];
});

mock.onPut('/api/todo/update/starred').reply((request) => {
  const {taskIds, status} = JSON.parse(request.data);
  todoData = todoData.map((task) => {
    if (taskIds.includes(task.id)) {
      task.isStarred = !!status;
      return task;
    } else {
      return task;
    }
  });
  const updatedTasks = todoData.filter((task) => taskIds.includes(task.id));
  return [200, updatedTasks];
});

mock.onPost('/api/todoApp/compose').reply((request) => {
  const {task} = JSON.parse(request.data);
  task.assignedTo = staffList.find((staff) => staff.id === task.assignedTo);
  task.priority = priorityList.find(
    (priority) => priority.type === task.priority,
  );
  todoData = [task, ...todoData];
  return [200, task];
});
