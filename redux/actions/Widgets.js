import {
  ADD_WIDGETS_DATA,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GENERATE_WIDGET_ERROR,
  GENERATE_WIDGET_START,
  GENERATE_WIDGET_SUCCESS,
  GET_WIDGETS_DATA,
  SHOW_MESSAGE,
  SOMETHING_SMELLS_FISHY,
} from '../../shared/constants/ActionTypes';
import ApiAuth from '../../@sling/services/ApiAuthConfig';

import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {GET_WIDGETS, SERVICE_URL, AI_SERVICE_URL} from '../../shared/constants/Services';
import {CreateWidget, UpdateWidget} from '../../@sling/services/widget/index';
import {capital} from '../../@sling/utility/Utils';
import {checkCodePolicy} from '../../modules/aiBuilder/codePolicy';
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
      const {append, ...apiFilters} = filters || {};
      if (!append) {
        dispatch({type: FETCH_START});
      }
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const data = await Api.post(`${GET_WIDGETS}`, apiFilters);
      // console.log('[getWidgets] actions Response: ', JSON.stringify(data));

      if (data.status === 200) {
        if (!append) {
          dispatch({type: FETCH_SUCCESS});
        }
        const raw = data.data.widgets;
        const widgets = Array.isArray(raw) ? raw : raw?.widgets || [];
        const totalCount = data.data.tc ?? raw?.tc ?? widgets.length;
        dispatch({
          type: GET_WIDGETS_DATA,
          payload: {
            widgets,
            totalCount,
            append: Boolean(append),
          },
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

export const deleteWidget = (id, filters = {}) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      dispatch({type: FETCH_START});
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }

      await Api.post(`${SERVICE_URL}v1/widgets/deleteWidget`, {
        id,
      });
      dispatch({type: FETCH_SUCCESS});

      dispatch({
        type: SHOW_MESSAGE,
        payload: 'Widget deleted successfully',
      });
      dispatch(getWidgets({status: filters.status, page: 0, size: 8}));
    } catch (error) {
      console.log(error, '[getWidgets] Exception');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const generateWidget = (prompt, themeConfig) => {
  return async (dispatch) => {
    dispatch({type: GENERATE_WIDGET_START});
    try {
      const aiBase = (AI_SERVICE_URL || '').replace(/\/$/, '');
      const aiRes = await fetch(`${aiBase}/widget/generate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt, themeConfig}),
      });
      const aiData = await aiRes.json();
      if (!aiRes.ok) {
        throw new Error(aiData.error || 'AI generation failed');
      }

      const Api = await ApiAuth();
      const res = await Api.post(`${SERVICE_URL}v1/widgets`, {
        ...aiData,
        ownership: 'private',
        source: 'ai_generated',
        status: 'draft',
        generationPrompt: prompt,
      });
      if (res.status === 201) {
        dispatch({type: GENERATE_WIDGET_SUCCESS, payload: res.data.widget});
        dispatch({type: SHOW_MESSAGE, payload: 'Widget generated successfully'});
        return res.data.widget;
      }
      dispatch({type: GENERATE_WIDGET_ERROR, payload: 'Generation failed'});
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Generation failed';
      dispatch({type: GENERATE_WIDGET_ERROR, payload: msg});
      dispatch({type: FETCH_ERROR, payload: msg});
    }
  };
};

export const saveGeneratedWidget = (widgetData, prompt) => {
  return async (dispatch) => {
    try {
      const policy = checkCodePolicy(widgetData.code || '', widgetData.dependencies);
      if (!policy.allowed) {
        const msg = policy.violations.map((item) => item.message).join(' ');
        dispatch({type: GENERATE_WIDGET_ERROR, payload: msg});
        dispatch({type: FETCH_ERROR, payload: msg});
        return null;
      }
      const Api = await ApiAuth();
      const res = await Api.post(`${SERVICE_URL}v1/widgets`, {
        ...widgetData,
        ownership: 'private',
        source: 'ai_generated',
        status: 'draft',
        generationPrompt: prompt,
      });
      if (res.status === 201) {
        dispatch({type: GENERATE_WIDGET_SUCCESS, payload: res.data.widget});
        dispatch({type: SHOW_MESSAGE, payload: 'Widget generated successfully'});
        return res.data.widget;
      }
      dispatch({type: GENERATE_WIDGET_ERROR, payload: 'Failed to save widget'});
      return null;
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Save failed';
      dispatch({type: GENERATE_WIDGET_ERROR, payload: msg});
      dispatch({type: FETCH_ERROR, payload: msg});
      return null;
    }
  };
};

export const submitForReview = (widgetId) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const Api = await ApiAuth();
      const res = await Api.post(
        `${SERVICE_URL}v1/widgets/${widgetId}/submit-for-review`,
      );
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SHOW_MESSAGE, payload: 'Widget submitted for review'});
      return res.data.widget;
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
};

export const reviewWidgetAction = (widgetId, action, notes) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const Api = await ApiAuth();
      const res = await Api.post(
        `${SERVICE_URL}v1/widgets/${widgetId}/review`,
        {action, notes},
      );
      dispatch({type: FETCH_SUCCESS});
      dispatch({
        type: SHOW_MESSAGE,
        payload: `Widget ${action}d successfully`,
      });
      return res.data.widget;
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
};

export const publishWidgetAction = (widgetId) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const Api = await ApiAuth();
      const res = await Api.post(
        `${SERVICE_URL}v1/widgets/${widgetId}/publish`,
      );
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SHOW_MESSAGE, payload: 'Widget published successfully'});
      return res.data.widget;
    } catch (error) {
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
};
