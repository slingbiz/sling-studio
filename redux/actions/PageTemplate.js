import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_PAGE_TEMPLATE,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@sling/services/ApiConfig';
import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';

export const getPageTemplates = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    // TODO : Page tempaltes apis to be changed
    Api.get('/api/getPageTemplates')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_PAGE_TEMPLATE, payload: data.data});
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
