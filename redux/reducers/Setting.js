import {
  SET_INITIAL_PATH,
  TOGGLE_NAV_COLLAPSED,
} from '../../shared/constants/ActionTypes';

const initialSettings = {
  navCollapsed: false,
  initialPath: '/',
};

const settingsReducer = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        navCollapsed: false,
      };

    case TOGGLE_NAV_COLLAPSED:
      return {
        ...state,
        navCollapsed: !state.navCollapsed,
      };

    case SET_INITIAL_PATH:
      return {
        ...state,
        initialPath: action.payload,
      };

    default:
      return state;
  }
};

export default settingsReducer;
