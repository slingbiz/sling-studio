import {
  ADD_WIDGETS_DATA,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_WIDGETS_DATA,
  SHOW_MESSAGE,
  SOMETHING_SMELLS_FISHY,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';

import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {GET_WIDGETS} from '../../shared/constants/Services';
import {CreateWidget, UpdateWidget} from '../../@sling/services/widget/index';
import {capital} from '../../@sling/utility/Utils';
import _ from 'lodash';

export const createWidget = (widgetData) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const data = await CreateWidget(widgetData);
      if (data.status == 201) {
        let {widget} = data.data;
        dispatch({
          type: ADD_WIDGETS_DATA,
          payload: {widget},
        });
        dispatch({
          type: SHOW_MESSAGE,
          payload: `${capital(widget.type)} created successfully`,
        });
      } else {
        dispatch({type: FETCH_ERROR, payload: SOMETHING_SMELLS_FISHY});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.response.data.message});
      console.log(error.response.data.message);
    }
  };
};

export const updateWidget = (id, widgetData) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const data = await UpdateWidget(id, widgetData);
      if (data.status == 201) {
        let {widgets} = data.data;
        dispatch({
          type: GET_WIDGETS_DATA,
          payload: {widgets},
        });
        dispatch({
          type: SHOW_MESSAGE,
          payload: `${_.upperFirst(widgets[0].type)} '${
            widgets[0].key
          }' updated successfully`,
        });
      } else {
        dispatch({type: FETCH_ERROR, payload: SOMETHING_SMELLS_FISHY});
      }
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
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
      const data = await Api.post(`${GET_WIDGETS}`, filters);
      // console.log('[getWidgets] actions Response: ', JSON.stringify(data));

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
