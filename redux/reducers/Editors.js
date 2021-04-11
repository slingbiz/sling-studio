import {
  GET_BALLOON_BLOCK_DATA,
  GET_BALLOON_DATA,
  GET_CLASSIC_DATA,
  GET_CUSTOM_DATA,
  GET_DOCUMENT_DATA,
  GET_INLINE_DATA,
  UPDATE_BALLOON_BLOCK_DATA,
  UPDATE_BALLOON_DATA,
  UPDATE_CLASSIC_DATA,
  UPDATE_CUSTOM_DATA,
  UPDATE_DOCUMENT_DATA,
  UPDATE_INLINE_DATA,
} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
  balloonBlock: `<p>Loading content... </p>`,
  balloon: `<p>Loading content... </p>`,
  classic: `<p>Loading content... </p>`,
  inline: `<p>Loading content... </p>`,
  document: `<p>Loading content... </p>`,
  custom: `<p>Loading content... </p>`,
};

const editorReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BALLOON_BLOCK_DATA: {
      return {...state, balloonBlock: action.payload};
    }
    case UPDATE_BALLOON_BLOCK_DATA: {
      return {...state, balloonBlock: action.payload};
    }
    case GET_BALLOON_DATA: {
      return {...state, balloon: action.payload};
    }
    case UPDATE_BALLOON_DATA: {
      return {...state, balloon: action.payload};
    }
    case GET_CLASSIC_DATA: {
      return {...state, classic: action.payload};
    }
    case UPDATE_CLASSIC_DATA: {
      return {...state, classic: action.payload};
    }
    case GET_INLINE_DATA: {
      return {...state, inline: action.payload};
    }
    case UPDATE_INLINE_DATA: {
      return {...state, inline: action.payload};
    }
    case GET_DOCUMENT_DATA: {
      return {...state, document: action.payload};
    }
    case UPDATE_DOCUMENT_DATA: {
      return {...state, document: action.payload};
    }
    case GET_CUSTOM_DATA: {
      return {...state, custom: action.payload};
    }
    case UPDATE_CUSTOM_DATA: {
      return {...state, custom: action.payload};
    }
    default:
      return state;
  }
};
export default editorReducer;
