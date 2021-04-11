import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
  UPDATE_AUTH_USER,
} from '../../shared/constants/ActionTypes';
import {Auth} from 'aws-amplify';
import { Cookies } from 'react-cookie';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';

export const onConfirmCognitoUserSignup = (username, confirmCode, history) => {
  const code = confirmCode ? confirmCode : '000000';
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.confirmSignUp(username, code, {
      forceAliasCreation: false,
    })
      .then((data) => {
        if (data) {
          if (history) {
            history.replace('/signin');
          }
          dispatch({
            type: SHOW_MESSAGE,
            payload:
              'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      })
      .catch(function (error) {
        switch (error.code) {
          case 'UserNotFoundException': {
            return dispatch({type: FETCH_ERROR});
          }
          case 'NotAuthorizedException': {
            return dispatch({
              type: FETCH_ERROR,
              payload: 'The entered Email address is already registered!',
            });
          }
          case 'AliasExistsException': {
            return dispatch({
              type: FETCH_ERROR,
              payload: 'The entered Email address is already registered!',
            });
          }
          case 'UsernameExistsException': {
            dispatch({
              type: FETCH_ERROR,
              payload:
                'you have already started Signup Process, please enter security code to complete the process!',
            });
            return history.push('/confirm-signup', {email: username});
          }
          case 'CodeMismatchException': {
            if (code === '000000') {
              dispatch({
                type: FETCH_ERROR,
                payload:
                  'you have already started Signup Process, please enter security code to complete the process!',
              });
              return history.push('/confirm-signup', {email: username});
            }
            return dispatch({type: FETCH_ERROR, payload: error.message});
          }
          case 'ExpiredCodeException': {
            dispatch({
              type: FETCH_ERROR,
              payload: 'The Code you entered is expired, please signup again!',
            });
            return history.push('/signup');
          }
          default:
            return false;
        }
      });
  };
};

export const onSignUpCognitoUser = ({email, password, name}, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.signUp({
      username: email,
      password,
      attributes: {
        name,
      },
    })
      .then((data) => {
        if (data) {
          if (history) {
            history.push('/confirm-signup', {email: email});
            dispatch({
              type: SHOW_MESSAGE,
              payload:
                'A code has been sent to your registered email address, Enter the code to complete the signup process!',
            });
          }
        }
      })
      .catch(function (error) {
        if (error.code === 'UsernameExistsException') {
          dispatch({
            type: FETCH_ERROR,
            payload:
              'you have already started Signup Process, please enter security code to complete the process!',
          });
          return history.push('/confirm-signup', {email: email});
        }
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onSignInCognitoUser = ({email, password}, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.signIn(email, password)
      .then((user) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          dispatch({type: UPDATE_AUTH_USER, payload: getUserObject(user)});
          history.push('/force-change-password', {email});
          dispatch({type: FETCH_SUCCESS});
        } else {
          dispatch({
            type: UPDATE_AUTH_USER,
            payload: getUserObject(user),
          });
          dispatch({type: FETCH_SUCCESS});
        }
      })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

const getUserObject = (user) => {
  return {
    authType: AuthType.AWS_COGNITO,
    role: defaultUser.role,
    uid: user.username,
    displayName: user.attributes.name,
    email: user.attributes.email,
    photoURL: user.photoURL,
    token: user.signInUserSession.accessToken.jwtToken,
  };
};

export const onChangePasswordFirstTime = ({email, password}, user) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.completeNewPassword(user, password, {email: email})
      .then((user) => {

        const cookies = new Cookies();
        cookies.set('token', user.signInUserSession.accessToken.jwtToken, { path: "/" });
        // dispatch({type: USER_TOKEN_SET, payload: user.signInUserSession.accessToken.jwtToken});
        dispatch({type: UPDATE_AUTH_USER, payload: getUserObject(user)});
        dispatch({type: FETCH_SUCCESS});
      })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onResetCognitoPassword = (email, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.forgotPassword(email)
      .then((data) => {
        if (data) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: SHOW_MESSAGE,
            payload: `A code has been sent to registered email address ${data.CodeDeliveryDetails.Destination}`,
          });
          history.push('/reset-password', {email: email});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onSetNewCognitoPassword = (email, code, new_password, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.forgotPasswordSubmit(email, code, new_password)
      .then((data) => {
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'The new Password has been successfully set',
        });
        history.push('/signin');
      })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onCognitoUserSignOut = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.signOut().then(() => {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: UPDATE_AUTH_USER, payload: null});
    });
  };
};

export const onGetLoggedInCognitoUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_AUTH_USER,
            payload: getUserObject(user),
          });
        } else {
          dispatch({type: FETCH_ERROR, payload: user.error});
        }
      })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
