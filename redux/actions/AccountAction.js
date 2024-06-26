import React from 'react';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  UPDATE_ACCOUNT,
  UPDATE_NEW_USER_STATUS,
} from '../../shared/constants/ActionTypes';
import {
  CompanyRegistrationForm,
  CompanyMembershipForm,
  CompanyKeyCodeSetupForm,
  GetCompanyInfo,
  UpdateCompanyInfo,
  UpdateStoreInfo,
} from '../../@sling/services/account/index';
import IntlMessages from '../../@sling/utility/IntlMessages';

export const onCompanyRegistrationForm = (formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return CompanyRegistrationForm(formData)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
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

    return CompanyMembershipForm(id, formData)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
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

    return CompanyKeyCodeSetupForm(id, formData)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          dispatch({type: UPDATE_NEW_USER_STATUS, payload: 'false'});
          localStorage.setItem('newUser', 'false');
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
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

export const getCompanyInfo = (email) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return GetCompanyInfo(email)
      .then((res) => {
        console.log('getCompanyInfo', res);
        if (res.status == 200) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
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

export const updateCompanyInfo = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return UpdateCompanyInfo(id, formData)
      .then((res) => {
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: <IntlMessages id='message.updatedSuccessfully' />,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
        }
        return res;
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};

export const updateStoreInfo = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return UpdateStoreInfo(id, formData)
      .then((res) => {
        console.log('getCompanyInfo', res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: <IntlMessages id='message.updatedSuccessfully' />,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
        }
        return res;
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};

export const updateSiteSettingInfo = (id, formData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    return UpdateCompanyInfo(formData)
      .then((res) => {
        console.log('getCompanyInfo', res);
        if (res.status == 201) {
          dispatch({type: UPDATE_ACCOUNT, payload: res.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: <IntlMessages id='message.updatedSuccessfully' />,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: <IntlMessages id='message.invalidSession' />,
          });
        }
        return res;
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        return error;
      });
  };
};
