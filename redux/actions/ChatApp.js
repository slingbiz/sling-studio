import {
  ADD_NEW_MESSAGE,
  DELETE_MESSAGE,
  DELETE_USER_MESSAGES,
  EDIT_MESSAGE,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_CONNECTIONS_LIST,
  GET_USER_MESSAGES,
  SELECT_USER,
  TOGGLE_CHAT_DRAWER,
} from '../../shared/constants/ActionTypes';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

export const getConnectionList = () => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/chatApp/connections')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CONNECTIONS_LIST, payload: data.data});
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

export const getConnectionMessages = (id) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.get('/api/chatApp/connection/messages', {
      params: {
        id,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_USER_MESSAGES, payload: data.data});
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

export const onSendMessage = (channelId, message) => {
  const {messages} = appIntl();
  return (dispatch, getState) => {
    Api.post('/api/chatApp/message', {channelId, message})
      .then((data) => {
        console.log('data', data.data);
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          if (
            data.data.userMessages &&
            data.data.userMessages.messageData.length === 1 &&
            getState().chatApp.userMessages &&
            getState().chatApp.userMessages.messageData
          ) {
            console.log(
              'getState().chatApp.userMessages.messageData',
              getState().chatApp.userMessages.messageData,
            );
            dispatch({
              type: ADD_NEW_MESSAGE,
              payload: {
                data: {
                  ...data.data,
                  userMessages: {
                    ...data.userMessages,
                    messageData: getState().chatApp.userMessages.messageData.concat(
                      data.data.userMessages.messageData,
                    ),
                  },
                },
              },
            });
            console.log(getState().chatApp.userMessages);
          } else {
            dispatch({
              type: ADD_NEW_MESSAGE,
              payload: {data: data.data},
            });
          }
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

export const onEditMessage = (channelId, message) => {
  const {messages} = appIntl();
  return (dispatch) => {
    Api.put('/api/chatApp/message', {channelId, message})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: EDIT_MESSAGE,
            payload: {data: data.data},
          });
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

export const onDeleteMessage = (channelId, messageId) => {
  const {messages} = appIntl();
  return (dispatch) => {
    Api.post('/api/chatApp/delete/message', {channelId, messageId})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_MESSAGE, payload: data.data});
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

export const onDeleteConversation = (channelId) => {
  const {messages} = appIntl();
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Api.post('/api/chatApp/delete/user/messages', {channelId})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_USER_MESSAGES, payload: data.data});
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

export const onSelectUser = (user) => {
  return (dispatch) => {
    dispatch({type: SELECT_USER, payload: user});
  };
};

export const onToggleChatDrawer = () => {
  return (dispatch) => {
    dispatch({type: TOGGLE_CHAT_DRAWER});
  };
};
