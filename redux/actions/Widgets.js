import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_WIDGETS_DATA,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';

import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {GET_WIDGETS} from '../../shared/constants/Services';

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
      console.log('[getWidgets] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_WIDGETS_DATA, payload: data.data.widgets});
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
