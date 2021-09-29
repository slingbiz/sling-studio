import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_ROUTES_LIST,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@sling/services/ApiConfig';
import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {appIntl} from '../../@sling/utility/Utils';
import {GET_ROUTES_LIST_API} from '../../shared/constants/Services';

export const addRoute = (route) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/api/saveRoute', route)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'New Route Added.',
          });
          dispatch(getRoutesList());
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

export const getRoutesList = (filters) => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCH_START});
      const data = await Api.post(`${GET_ROUTES_LIST_API}`, filters);
      console.log('[getMedia] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ROUTES_LIST, payload: data.data.routesList});
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
