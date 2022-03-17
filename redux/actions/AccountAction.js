import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_ACCOUNT,
} from '../../shared/constants/ActionTypes';
import {
  registerAccountForm1,
  registerAccountForm2,
  registerAccountForm3,
} from '../../@sling/services/account/index';

export const onRegisterForm1 = (formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const token = localStorage.getItem('access_token');
      return registerAccountForm1(formData, token)
        .then((res) => {
          console.log(res);
          if (res.data != 1) {
            dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          } else {
            dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
          }
          dispatch({type: FETCH_SUCCESS});
        })
        .catch((error) => {
          console.log(error);
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
export const onRegisterForm2 = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const token = localStorage.getItem('access_token');
      return registerAccountForm2(id, formData, token)
        .then((res) => {
          console.log(res);
          if (res.data != 1) {
            dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          } else {
            dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
          }
          dispatch({type: FETCH_SUCCESS});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
export const onRegisterForm3 = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const token = localStorage.getItem('access_token');
      return registerAccountForm3(id, formData, token)
        .then((res) => {
          console.log(res);
          if (res.data != 1) {
            dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          } else {
            dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
          }
          dispatch({type: FETCH_SUCCESS});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
