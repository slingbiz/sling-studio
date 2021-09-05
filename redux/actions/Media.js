import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    GET_MEDIA_IMAGES, GET_MEDIA_CONSTANTS,
    SHOW_MESSAGE,
} from '../../shared/constants/ActionTypes';
import Api from '../../@sling/services/ApiConfig';
import React from 'react';
import IntlMessages from '../../@sling/utility/IntlMessages';
import { appIntl } from '../../@sling/utility/Utils';

export const addImage = (imageMeta) => {
    const { messages } = appIntl();
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        Api.post('/api/saveImage', imageMeta)
            .then((data) => {
                if (data.status === 200) {
                    dispatch({ type: FETCH_SUCCESS });
                    dispatch({
                        type: SHOW_MESSAGE,
                        payload: 'New Image Added.',
                    });
                    dispatch(getAllImages());
                } else {
                    dispatch({
                        type: FETCH_ERROR,
                        payload: messages['message.somethingWentWrong'],
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: FETCH_ERROR, payload: error.message });
            });
    };
};

export const getAllImages = (searchText) => {
    const query = searchText ? `/api/mediaImages?query=${searchText}` : `/api/mediaImages`
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        Api.get(query)
            .then((data) => {
                if (data.status === 200) {
                    dispatch({ type: FETCH_SUCCESS });
                    dispatch({ type: GET_MEDIA_IMAGES, payload: data.data });
                } else {
                    dispatch({
                        type: FETCH_ERROR,
                        payload: <IntlMessages id='message.somethingWentWrong' />,
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: FETCH_ERROR, payload: error.message });
            });
    };
};

export const updateMediaConstant = (constants) => {
    const { messages } = appIntl();
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        Api.post('/api/updateMediaConstant', constants)
            .then((data) => {
                if (data.status === 200) {
                    dispatch({ type: FETCH_SUCCESS });
                    dispatch({
                        type: SHOW_MESSAGE,
                        payload: 'New Image Added.',
                    });
                    dispatch(getMediaConstants());
                } else {
                    dispatch({
                        type: FETCH_ERROR,
                        payload: messages['message.somethingWentWrong'],
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: FETCH_ERROR, payload: error.message });
            });
    };
};

export const getMediaConstants = (searchText) => {
    const query = searchText ? `/api/mediaConstants?query=${searchText}` : `/api/mediaConstants`;
    return (dispatch) => {
        dispatch({ type: FETCH_START });
        Api.get(query)
            .then((data) => {
                if (data.status === 200) {
                    dispatch({ type: FETCH_SUCCESS });
                    dispatch({ type: GET_MEDIA_CONSTANTS, payload: data.data });
                } else {
                    dispatch({
                        type: FETCH_ERROR,
                        payload: <IntlMessages id='message.somethingWentWrong' />,
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: FETCH_ERROR, payload: error.message });
            });
    };
};
