import {
  CREATE_NEW_TASK,
  GET_TASK_DETAIL,
  GET_TASK_LIST,
  GET_TODO_FOLDER_LIST,
  GET_TODO_LABEL_LIST,
  GET_TODO_PRIORITY_LIST,
  GET_TODO_STAFF_LIST,
  GET_TODO_STATUS_LIST,
  TOGGLE_TODO_DRAWER,
  UPDATE_TASK_DETAIL,
  UPDATE_TASK_FOLDER,
  UPDATE_TASK_LABEL,
  UPDATE_TASK_STARRED_STATUS,
} from '../../shared/constants/ActionTypes';

const initialState = {
  taskList: [],
  folderList: [],
  labelList: [],
  priorityList: [],
  statusList: [],
  staffList: [],
  totalTasks: null,
  todoDrawer: false,
  selectedTask: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
      return {
        ...state,
        taskList: action.payload.list,
        totalTasks: action.payload.total,
      };

    case GET_TODO_FOLDER_LIST:
      return {
        ...state,
        folderList: action.payload,
      };

    case TOGGLE_TODO_DRAWER:
      return {
        ...state,
        todoDrawer: !state.todoDrawer,
      };

    case GET_TODO_STATUS_LIST:
      return {
        ...state,
        statusList: action.payload,
      };

    case GET_TODO_LABEL_LIST:
      return {
        ...state,
        labelList: action.payload,
      };

    case GET_TODO_STAFF_LIST:
      return {
        ...state,
        staffList: action.payload,
      };

    case GET_TODO_PRIORITY_LIST:
      return {
        ...state,
        priorityList: action.payload,
      };

    case CREATE_NEW_TASK:
      return {
        ...state,
        taskList: [action.payload, ...state.taskList],
        totalTasks: state.totalTasks + 1,
      };

    case UPDATE_TASK_FOLDER: {
      return {
        ...state,
        taskList: action.payload.list,
        totalTasks: action.payload.total,
      };
    }

    case UPDATE_TASK_LABEL: {
      let taskIds = action.payload.map((task) => task.id);
      const updatedList = state.taskList.map((task) => {
        if (taskIds.includes(task.id)) {
          return action.payload.find(
            (selectedTask) => selectedTask.id === task.id,
          );
        } else {
          return task;
        }
      });
      return {
        ...state,
        taskList: updatedList,
      };
    }

    case UPDATE_TASK_STARRED_STATUS: {
      let taskIds = action.payload.data.map((task) => task.id);
      const updatedList = state.taskList.map((task) => {
        if (taskIds.includes(task.id)) {
          return action.payload.data.find(
            (selectedTask) => selectedTask.id === task.id,
          );
        } else {
          return task;
        }
      });
      const filteredList =
        action.payload.folderName === 'starred'
          ? updatedList.filter((item) => item.isStarred)
          : updatedList;
      const total =
        action.payload.folderName === 'starred'
          ? state.totalTasks - action.payload.data.length
          : state.totalTasks;
      return {
        ...state,
        taskList: filteredList,
        totalTasks: total,
      };
    }

    case GET_TASK_DETAIL:
      return {
        ...state,
        selectedTask: action.payload,
      };

    case UPDATE_TASK_DETAIL:
      return {
        ...state,
        selectedTask: action.payload,
      };

    default:
      return state;
  }
};
export default todoReducer;
