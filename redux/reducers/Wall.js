import {
  CREATE_NEW_POST,
  GET_FEED_POSTS,
  GET_WALL_DATA,
  UPDATE_POST,
} from '../../shared/constants/ActionTypes';

const initialState = {
  wallData: null,
  postList: [],
};

const wallReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALL_DATA:
      console.log('action.a', action.payload);
      return {
        ...state,
        wallData: action.payload,
      };
    case GET_FEED_POSTS: {
      return {...state, postList: action.payload};
    }

    case CREATE_NEW_POST: {
      return {
        ...state,
        postList: [action.payload, ...state.postList],
      };
    }

    case UPDATE_POST: {
      return {
        ...state,
        postList: state.postList.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    }
    default: {
      return state;
    }
  }
};
export default wallReducer;
