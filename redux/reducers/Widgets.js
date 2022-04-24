import {
  ADD_WIDGETS_DATA,
  GET_WIDGETS_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  widgets: null,
  totalCount: 0,
};

const widgetsReducer = (state = initialState, action) => {
  console.log(action.type, '@reducer action.type', action.payload);
  console.log(action.type, '@reducer action.type state', state.widgets);
  switch (action.type) {
    case GET_WIDGETS_DATA:
      return {
        ...state,
        widgets: action.payload.widgets,
        totalCount: action.payload.widgets.length,
      };
    case ADD_WIDGETS_DATA:
      return {
        ...state,
        widgets: state.widgets.concat(action.payload.widget),
        totalCount: state.totalCount + 1,
      };

    default:
      return state;
  }
};
export default widgetsReducer;
