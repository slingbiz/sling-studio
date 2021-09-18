import {GET_WIDGETS_DATA} from '../../shared/constants/ActionTypes';

const initialState = {
  widgets: null,
  totalCount: 0,
};

const widgetsReducer = (state = initialState, action) => {
  console.log(action.type, '@reducer action.type', action.payload);
  switch (action.type) {
    case GET_WIDGETS_DATA:
      return {
        ...state,
        widgets: action.payload.widgets,
        totalCount: action.payload.tc,
      };

    default:
      return state;
  }
};
export default widgetsReducer;
