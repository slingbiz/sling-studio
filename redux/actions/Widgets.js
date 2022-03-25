import {
  ADD_WIDGETS_DATA,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_WIDGETS_DATA,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';

import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {GET_WIDGETS} from '../../shared/constants/Services';
import {CreateWidget, UpdateWidget} from '../../@sling/services/widget/index';

export const createWidget = (widgetData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return CreateWidget(widgetData)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({
            type: ADD_WIDGETS_DATA,
            payload: {widget: res.data.widget},
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
        }
        dispatch({type: FETCH_SUCCESS});
        return res;
      })
      .catch((error) => {
        console.log(error);
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};

export const updateWidget = (id, widgetData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return UpdateWidget(id, widgetData)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({
            type: GET_WIDGETS_DATA,
            payload: {widgets: res.data.widgets},
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
        }
        dispatch({type: FETCH_SUCCESS});
        return res;
      })
      .catch((error) => {
        console.log(error);
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};

export const getWidgets = (filters) => {
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
      const data = await Api.get(`${GET_WIDGETS}`, {params: filters});
      console.log('[getWidgets] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: GET_WIDGETS_DATA,
          payload: data.data.widgets,
        });
      } else {
        console.log('[getWidgets] Error');
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      console.log(error, '[getWidgets] Exception');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
