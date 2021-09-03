import { GET_MEDIA_IMAGES, GET_MEDIA_CONSTANTS } from '../../shared/constants/ActionTypes';

const initialState = {
    mediaImages: [],
    mediaConstants: [],
};

const wallReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEDIA_IMAGES:
            return {
                ...state,
                mediaImages: action.payload,
            };
        case GET_MEDIA_CONSTANTS:
            return {
                ...state,
                mediaConstants: action.payload,
            };

        default: {
            return state;
        }
    }
};
export default wallReducer;
