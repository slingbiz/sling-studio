// redux/reducers/authReducer.js
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  UPDATE_NEW_SIGNUP,
  USER_LOADED,
  UPDATE_NEW_USER_STATUS,
} from '../../shared/constants/ActionTypes';

const initialState = {
  loading: true,
  isVerified: undefined,
  newUser: typeof window !== 'undefined' && localStorage.getItem('newUser'),
  user:
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')),
  token: typeof window !== 'undefined' && localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_USER_STATUS: {
      return {
        ...state,
        newUser: action.payload,
      };
    }
    case UPDATE_AUTH_USER: {
      const newState = {
        ...state,
        newUser:
          (typeof window !== 'undefined' && localStorage.getItem('newUser')) ||
          state.newUser,
        loading: false,
        user: action.payload,
      };
      localStorage.setItem('user', JSON.stringify(action.payload));
      return newState;
    }
    case SIGNOUT_AUTH_SUCCESS: {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('newUser');
      return {
        ...state,
        user: null,
        token: null,
        newUser: null,
      };
    }
    case USER_LOADED: {
      return {...state, loading: false};
    }
    case SET_AUTH_TOKEN: {
      localStorage.setItem('token', action.payload);
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
