import {
  ADD_WIDGETS_DATA,
  GENERATE_WIDGET_ERROR,
  GENERATE_WIDGET_START,
  GENERATE_WIDGET_SUCCESS,
  GET_WIDGETS_DATA,
} from '../../shared/constants/ActionTypes';

const initialState = {
  widgets: null,
  totalCount: 0,
  generating: false,
  generatedWidget: null,
};

const widgetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WIDGETS_DATA: {
      const list = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.widgets || [];
      const append = !Array.isArray(action.payload) && Boolean(action.payload?.append);
      const widgets = append ? [...(state.widgets || []), ...list] : list;
      const totalCount = Array.isArray(action.payload)
        ? list.length
        : action.payload?.totalCount ?? list.length;
      return {
        ...state,
        widgets,
        totalCount,
      };
    }
    case ADD_WIDGETS_DATA:
      return {
        ...state,
        widgets: state.widgets.concat(action.payload.widget),
        totalCount: state.totalCount + 1,
      };
    case GENERATE_WIDGET_START:
      return {...state, generating: true, generatedWidget: null};
    case GENERATE_WIDGET_SUCCESS:
      return {...state, generating: false, generatedWidget: action.payload};
    case GENERATE_WIDGET_ERROR:
      return {...state, generating: false, generatedWidget: null};

    default:
      return state;
  }
};
export default widgetsReducer;
