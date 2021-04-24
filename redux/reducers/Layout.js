import {SET_LAYOUT} from '../../shared/constants/ActionTypes';

const initialState = {
  layoutConfig: null,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAYOUT: {
      return {...state, layoutConfig: action.payload};
    }

    default: {
      return state;
    }
  }
};
export default layoutReducer;
