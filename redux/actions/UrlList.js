import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_URL_LIST,
  Add_URL,
  SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@sling/services/ApiConfig';
import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import {appIntl} from '../../@sling/utility/Utils';

export const addURL = () => {
  const {messages} = appIntl();
  const urlList = [
    'https://www.freecodecamp.org/',
    'https:///sling.biz/frontend',
    'https://www.pexels.com/',
    'https://dev.to/',
    'https://www.stackbit.com/',
    'https://airbnb-clone-typescript.vercel.app/',
    'https://hulu-clone-nextjs-lilac.vercel.app/',
  ];
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/api/addApi', urlList)
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: 'New URL Added.',
          });
          dispatch(getUrlList());
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

export const getUrlList = () => {
  const urlList = [
    'https://www.freecodecamp.org/',
    'https:///sling.biz/frontend',
    'https://www.pexels.com/',
    'https://dev.to/',
    'https://www.stackbit.com/',
    'https://airbnb-clone-typescript.vercel.app/',
    'https://hulu-clone-nextjs-lilac.vercel.app/',
  ];
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/getApiList')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_URL_LIST, payload: urlList});
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
