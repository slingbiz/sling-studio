import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_API_LIST,
  ADD_API,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@sling/services/ApiConfig';
import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {appIntl} from '../../@sling/utility/Utils';

export const addApi = (apiMeta) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/api/addApi', apiMeta)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'New Api Added.',
          });
          dispatch(getApiList());
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

export const getApiList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/getApiList')
      .then((data) => {
        console.log(data, '@data@getApiList@actions');
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_API_LIST, payload: data.data});
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
