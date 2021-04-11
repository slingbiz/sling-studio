import {UPDATE_FIREBASE_USER} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  user: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIREBASE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
