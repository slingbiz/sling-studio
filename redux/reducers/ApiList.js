import {GET_API_LIST} from '../../shared/constants/ActionTypes';

const initialState = {
  apiList: [],
};

const wallReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_LIST:
      return {
        ...state,
        apiList: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default wallReducer;
