import {
  CREATE_NEW_POST,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_FEED_POSTS,
  GET_WALL_DATA,
  UPDATE_POST,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';

export const onGetWallData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/wall')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WALL_DATA, payload: data.data});
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

export const onGetPostsList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/wall/posts')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_FEED_POSTS, payload: data.data});
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

export const onCreateNewPost = (post) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/wall/posts', {post})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: CREATE_NEW_POST, payload: data.data});
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

export const onUpdatePostStatus = (postId, status) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.put('/wall/posts', {postId, status})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_POST,
            payload: data.data,
          });
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

export const onAddNewComment = (postId, comment) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/wall/posts/comments', {postId, comment})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_POST, payload: data.data});
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
