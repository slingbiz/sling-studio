import {GET_ROUTES_LIST} from '../../shared/constants/ActionTypes';

const initialState = {
  routesList: [],
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUTES_LIST:
      return {
        ...state,
        routesList: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default routeReducer;
