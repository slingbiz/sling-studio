import {GET_ROUTES_LIST} from '../../shared/constants/ActionTypes';

const initialState = {
  routesList: [],
  totalCount: 0,
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUTES_LIST:
      return {
        ...state,
        routesList: action.payload.pageRoutes,
        totalCount: action.payload.tc,
      };

    default: {
      return state;
    }
  }
};
export default routeReducer;
