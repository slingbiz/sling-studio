import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_ROUTES_LIST,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';

import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {appIntl} from '../../@sling/utility/Utils';
import {GET_ROUTES_LIST_API, SAVE_ROUTE, UPDATE_ROUTE, DELETE_ROUTE} from '../../shared/constants/Services';

// Add Route
export const addRoute = (route) => {
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
    try {
      const data = await Api.post(`${SAVE_ROUTE}`, {...route});
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
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

// Get Routes List
export const getRoutesList = (filters) => {
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
    try {
      const data = await Api.post(`${GET_ROUTES_LIST_API}`, filters);
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ROUTES_LIST, payload: data.data.routesList});
      } else {
        console.log('[getRoutesList] Error');
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      console.log(error, '[getRoutesList] Exception');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

// Update Route
export const updateRoute = (route) => {
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
    try {
      const data = await Api.post(`${UPDATE_ROUTE}/${route.id}`, {...route});
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Route Updated Successfully.',
        });
        dispatch(getRoutesList());
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

// Delete Route
export const deleteRoute = (routeId) => {
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
    try {
      const data = await Api.post(`${DELETE_ROUTE}/${routeId}`);
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Route Deleted Successfully.',
        });
        dispatch(getRoutesList());
      } else {
        dispatch({
          type: FETCH_ERROR,
          payload: messages['message.somethingWentWrong'],
        });
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
