import React from 'react';
import Api from '../../@sling/services/ApiConfig';
import ApiAuth from '../../@sling/services/ApiAuthConfig';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_ACADEMY_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_ECOMMERCE_DATA,
  GET_HC_DATA,
  GET_LAYOUT_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {INIT_CONFIG, SET_CONFIG} from '../../shared/constants/Services';

//Set Layout Config
export const setLayoutConfig = (pageKey, root, meta) => {
  return async (dispatch) => {
    try {
      //Pass user info in the header
      const Api = await ApiAuth();
      if (!Api) {
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.invalidSession' />,
        });
      }
      const data = await Api.post(`${SET_CONFIG}`, {
        type: 'layout',
        pageKey,
        root,
        meta,
      });

      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch(fetchLayoutConfig());
      } else {
        console.log('@setLayoutConfig Error', data);
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      console.log(error, '@error @actions/dashboard/fetchconfig');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

//Fetch Layout Config
export const fetchLayoutConfig = () => {
  return async (dispatch) => {
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
    }
    try {
      const data = await Api.get(`${INIT_CONFIG}`);
      if (data.status === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_LAYOUT_DATA, payload: data.data});
      } else {
        console.log('data@fetchConfig Error', data);
        dispatch({
          type: FETCH_ERROR,
          payload: <IntlMessages id='message.somethingWentWrong' />,
        });
      }
    } catch (error) {
      console.log(error, '@error @actions/dashboard/fetchconfig');
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onGetAnalyticsData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/analytics')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ANALYTICS_DATA, payload: data.data});
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

export const onGetECommerceData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/ecommerce')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ECOMMERCE_DATA, payload: data.data});
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

export const onGetAcademyData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/academy')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_ACADEMY_DATA, payload: data.data});
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

export const onGetHCData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/health_care')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_HC_DATA, payload: data.data});
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

export const onGetCrmData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/crm')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CRM_DATA, payload: data.data});
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

export const onGetCryptoData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/crypto')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CRYPTO_DATA, payload: data.data});
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

export const onGetMetricsData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/dashboard/metrics')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_METRICS_DATA, payload: data.data});
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

export const onGetWidgetsData = () => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    const Api = await ApiAuth();
    if (!Api) {
      dispatch({
        type: FETCH_ERROR,
        payload: <IntlMessages id='message.invalidSession' />,
      });
    }
    Api.get('/dashboard/widgets')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_WIDGETS_DATA, payload: data.data});
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
