import Api from '../../@crema/services/ApiConfig';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_BALLOON_BLOCK_DATA,
  GET_BALLOON_DATA,
  GET_CLASSIC_DATA,
  GET_CUSTOM_DATA,
  GET_DOCUMENT_DATA,
  GET_INLINE_DATA,
  SHOW_MESSAGE,
  UPDATE_BALLOON_BLOCK_DATA,
  UPDATE_BALLOON_DATA,
  UPDATE_CLASSIC_DATA,
  UPDATE_CUSTOM_DATA,
  UPDATE_DOCUMENT_DATA,
  UPDATE_INLINE_DATA,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';

export const onGetBalloonBlockData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/editor/balloon-block')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_BALLOON_BLOCK_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onUpdateBalloonBlockData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/editor/balloon-block', data)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW_MESSAGE, payload: 'Saved!'});
          dispatch({type: UPDATE_BALLOON_BLOCK_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onGetBalloonData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/editor/balloon')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_BALLOON_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onUpdateBalloonData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/editor/balloon', data)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW_MESSAGE, payload: 'Saved!'});
          dispatch({type: UPDATE_BALLOON_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetClassicData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/editor/classic')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CLASSIC_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onUpdateClassicData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/editor/classic', data)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW_MESSAGE, payload: 'Saved!'});
          dispatch({type: UPDATE_CLASSIC_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetInlineData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/editor/inline')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_INLINE_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onUpdateInlineData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/editor/inline', data)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW_MESSAGE, payload: 'Saved!'});
          dispatch({type: UPDATE_INLINE_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetDocumentData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/editor/document')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_DOCUMENT_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onUpdateDocumentData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/editor/document', data)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW_MESSAGE, payload: 'Saved!'});
          dispatch({type: UPDATE_DOCUMENT_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetCustomData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/editor/custom')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CUSTOM_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
export const onUpdateCustomData = (data) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/editor/custom', data)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SHOW_MESSAGE, payload: 'Saved!'});
          dispatch({type: UPDATE_CUSTOM_DATA, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.somethingWentWrong' />,
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
