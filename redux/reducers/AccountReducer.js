import {UPDATE_ACCOUNT} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  account: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        account: action.payload,
      };
    }
    default:
      return state;
  }
};
