import {GET_URL_LIST} from '../../shared/constants/ActionTypes';

const initialState = {
  urlList: [],
};

const UrlList = (state = initialState, action) => {
  switch (action.type) {
    case GET_URL_LIST:
      return {
        ...state,
        urlList: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default UrlList;
