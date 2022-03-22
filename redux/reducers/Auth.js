import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  UPDATE_NEW_SIGNUP,
  USER_LOADED,
  UPDATE_NEW_USER_STATUS,
} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  loading: true,
  isVerified: undefined,
  newUser: typeof window !== 'undefined' && localStorage.getItem('newUser'),
  user: null,
  token: null,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_NEW_USER_STATUS: {
      return {
        ...state,
        newUser: action.payload,
      };
    }
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        newUser:
          (typeof window !== 'undefined' && localStorage.getItem('newUser')) ||
          state.newUser,
        loading: false,
        user: action.payload,
      };
    }
    case UPDATE_NEW_SIGNUP: {
      return {
        ...state,
        newUser: 'true',
        isVerified: false,
        loading: false,
        user: action.payload,
      };
    }
    case SIGNOUT_AUTH_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    case USER_LOADED: {
      return {...state, loading: false};
    }
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
