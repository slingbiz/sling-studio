import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_ACCOUNT,
  UPDATE_NEW_USER_STATUS,
} from '../../shared/constants/ActionTypes';
import {
  CompanyRegistrationForm,
  CompanyMembershipForm,
  CompanyKeyCodeSetupForm,
} from '../../@sling/services/account/index';

export const onCompanyRegistrationForm = (formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    const token = localStorage.getItem('access_token');
    return CompanyRegistrationForm(formData, token)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
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
export const onCompanyMembershipForm = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    const token = localStorage.getItem('access_token');
    return CompanyMembershipForm(id, formData, token)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
        }
        dispatch({type: FETCH_SUCCESS});
        return res;
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};
export const onCompanyKeyCodeSetupForm = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    const token = localStorage.getItem('access_token');
    return CompanyKeyCodeSetupForm(id, formData, token)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          dispatch({type: UPDATE_NEW_USER_STATUS, payload: 'false'});
          localStorage.setItem('newUser', 'false');
        } else {
          dispatch({type: FETCH_ERROR, payload: 'something went wrong'});
        }
        dispatch({type: FETCH_SUCCESS});
        return res;
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};
