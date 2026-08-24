import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_MEDIA_CONSTANTS,
  GET_MEDIA_DATA,
  SHOW_MESSAGE,
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

const mediaId = (value) => {
  if (!value) return value;
  if (typeof value === 'string') return value;
  return value.$oid || value._id || value.id || String(value);
};

const normalizeMediaPayload = (body) => {
  const block = body?.media;
  const media = Array.isArray(block) ? block : block?.media || [];
  const tc = body?.tc ?? block?.tc ?? media.length;
  return {media, tc};
};

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
          dispatch({
            type: 'UPLOAD_IMAGE',
            payload: '',
          });
          dispatch(getMedia({quiet: true}));
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

export const updateImage = (imageMeta) => {
  const {messages} = appIntl();
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
      return;
    }
    Api.post(`${SERVICE_URL}v1/media/updateImage`, {
      id: mediaId(imageMeta.id),
      name: imageMeta.name,
      altText: imageMeta.altText,
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Image updated.',
          });
          dispatch(getMedia({quiet: true}));
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload:
            error?.response?.data?.message ??
            error.message ??
            messages['message.somethingWentWrong'],
        });
      });
  };
};

export const deleteImage = (id) => {
  const {messages} = appIntl();
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
      return;
    }
    Api.delete(`${SERVICE_URL}v1/media/deleteImage/${mediaId(id)}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'Image deleted.',
          });
          dispatch(getMedia({quiet: true}));
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload:
            error?.response?.data?.message ??
            error.message ??
            messages['message.somethingWentWrong'],
        });
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
        dispatch({
          type: FETCH_ERROR,
          payload:
            error?.response?.data?.message ??
            messages['message.somethingWentWrong'],
        });
      });
  };
};

export const getMedia = (filters) => {
  return async (dispatch) => {
    try {
      const {quiet, ...apiFilters} = filters || {};
      if (!quiet) {
        dispatch({type: FETCH_START});
      }
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const data = await Api.post(`${GET_MEDIA_API}`, apiFilters);
      console.log('[getMedia] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        if (!quiet) {
          dispatch({type: FETCH_SUCCESS});
        }
        dispatch({
          type: GET_MEDIA_DATA,
          payload: normalizeMediaPayload(data.data),
        });
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

export const updateMediaConstant = () => {
  return async () => {};
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
