import {
  CREATE_NEW_CONTACT,
  DELETE_CONTACT,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_CONTACT_FOLDER_LIST,
  GET_CONTACT_LABEL_LIST,
  GET_CONTACT_LIST,
  SHOW_MESSAGE,
  TOGGLE_CONTACT_DRAWER,
  UPDATE_CONTACT_DETAIL,
  UPDATE_CONTACT_LABEL,
  UPDATE_CONTACT_STARRED_STATUS,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

export const onGetContactList = (type, name, currentPage) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.get('/api/contactApp/contact/List', {
      params: {
        type: type,
        name: name,
        page: page,
      },
    })
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CONTACT_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetLabelList = () => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.get('/api/contactApp/labels/list')
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CONTACT_LABEL_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetFolderList = () => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.get('/api/contactApp/folders/list')
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CONTACT_FOLDER_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onToggleContactDrawer = () => {
  return dispatch => {
    dispatch({type: TOGGLE_CONTACT_DRAWER});
  };
};

export const onUpdateContactLabel = (contactIds, type, labelName) => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.put('/api/contactApp/update/label', {contactIds, type})
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_CONTACT_LABEL,
            payload: {data: data.data, labelName: labelName, labelType: type},
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.labelUpdated'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onUpdateStarredStatus = (contactIds, status, folderName) => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.put('/api/contactApp/update/starred', {contactIds, status})
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_CONTACT_STARRED_STATUS,
            payload: {data: data.data, folderName: folderName},
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.starredStatus'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onDeleteContacts = (type, name, contactIds, page) => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.post('/api/contactApp/delete/contact', {type, name, contactIds, page})
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_CONTACT, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.contactDeleted'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onUpdateSelectedContact = contact => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.put('/api/contactApp/contact/', {contact})
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_CONTACT_DETAIL, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.contactUpdated'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onCreateContact = contact => {
  const {messages} = appIntl();
  return dispatch => {
    dispatch({type: FETCH_START});
    Api.post('/api/contactApp/compose', {contact})
      .then(data => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: CREATE_NEW_CONTACT, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.contactCreated'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
