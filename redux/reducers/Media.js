import {
  GET_MEDIA_IMAGES,
  GET_MEDIA_CONSTANTS,
  GET_MEDIA_DATA,
  UPLOAD_IMAGE,
} from '../../shared/constants/ActionTypes';

const initialState = {
  mediaImages: [],
  mediaConstants: [],
  uploadedImageUrl: '',
};

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEDIA_IMAGES:
      return {
        ...state,
        mediaImages: action.payload,
      };

    case GET_MEDIA_DATA:
      return {
        ...state,
        mediaImages: action.payload.media,
        totalCount: action.payload.tc,
      };

    case GET_MEDIA_CONSTANTS:
      return {
        ...state,
        mediaConstants: action.payload,
      };

    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadedImageUrl: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default mediaReducer;
