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

const asWidgetList = (payload) => {
  if (Array.isArray(payload)) {
    return {list: payload, totalCount: payload.length};
  }
  const nested = payload?.widgets;
  if (Array.isArray(nested)) {
    return {list: nested, totalCount: payload.totalCount ?? payload.tc ?? nested.length};
  }
  if (nested && Array.isArray(nested.widgets)) {
    return {
      list: nested.widgets,
      totalCount: payload.totalCount ?? nested.tc ?? nested.widgets.length,
    };
  }
  return {list: [], totalCount: 0};
};

const widgetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WIDGETS_DATA: {
      const {list, totalCount: counted} = asWidgetList(action.payload);
      const append = !Array.isArray(action.payload) && Boolean(action.payload?.append);
      const widgets = append ? [...(state.widgets || []), ...list] : list;
      const totalCount = Array.isArray(action.payload)
        ? list.length
        : action.payload?.totalCount ?? counted;
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
