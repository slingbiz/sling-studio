import {GET_PAGE_TEMPLATE} from '../../shared/constants/ActionTypes';

const initialState = {
  pageTemplates: [],
};

const pageTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_TEMPLATE:
      return {
        ...state,
        pageTemplates: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default pageTemplateReducer;
