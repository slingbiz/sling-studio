import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_USER_LIST,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';

export const onGetUserList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/user/list')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_USER_LIST, payload: data.data});
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
