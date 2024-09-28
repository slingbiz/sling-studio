import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_MEDIA_CONSTANTS,
  GET_MEDIA_DATA,
  SHOW_MESSAGE,
  UPLOAD_IMAGE,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';

import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {appIntl} from '../../@sling/utility/Utils';
import {
  GET_MEDIA_API,
  GET_MEDIA_CONSTANTS_API,
  SERVICE_URL,
} from '../../shared/constants/Services';

export const addImage = (imageMeta) => {
  const {messages} = appIntl();
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
    }
    Api.post(`${SERVICE_URL}v1/media/saveImage`, imageMeta, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'New Image Added.',
          });
          dispatch(getMedia());
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const uploadImage = (imageMeta) => {
  const {messages} = appIntl();
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
    }
    Api.post(`${SERVICE_URL}v1/media/uploadImage`, imageMeta)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Uploaded.',
          });

          // Take imageUrl and dispatch store update.
          const imageUrl = data.data.imageUrl;
          dispatch({
            type: 'UPLOAD_IMAGE',
            payload: imageUrl,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getMedia = (filters) => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCH_START});
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const data = await Api.post(`${GET_MEDIA_API}`, filters);
      console.log('[getMedia] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_MEDIA_DATA, payload: data.data.media});
      } else {
        console.log('[getMedia] Error');
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      console.log(error, '[getMedia] Exception');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const updateMediaConstant = (constants) => {
  const {messages} = appIntl();
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
    }
    Api.post('/api/updateMediaConstant', constants)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'New Image Added.',
          });
          dispatch(getMediaConstants());
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const getMediaConstants = (filters) => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCH_START});
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const data = await Api.post(`${GET_MEDIA_CONSTANTS_API}`, filters);
      console.log('[getMedia] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_MEDIA_CONSTANTS, payload: data.data.media});
      } else {
        console.log('[getMedia] Error');
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      console.log(error, '[getMedia] Exception');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
