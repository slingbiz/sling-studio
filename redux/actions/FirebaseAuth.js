import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from '../../@sling/services/auth/firebase-config';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../shared/constants/ActionTypes';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import {
  sendVerificationEmail,
  registerUser,
  loginUser,
} from '../../@sling/services/auth/backend/index';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../shared/constants/General';

export const onSignUpFirebaseUser = ({email, password, name}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          registerUser(name, email, password).then((res) => {
            console.log(res);
            if (res.data) {
              let tokens = res.data.tokens;
              localStorage.setItem(ACCESS_TOKEN, tokens.access.token);
              localStorage.setItem(REFRESH_TOKEN, tokens.refresh.token);
              sendVerificationEmail(tokens.access.token).then((ress) => {
                if (ress.status == 204) {
                  dispatch({type: FETCH_SUCCESS});
                  dispatch({
                    type: UPDATE_AUTH_USER,
                    payload: getUserObject({...data, ...res.data.user}),
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onForgetPasswordFirebaseUser = (email) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .sendPasswordResetEmail(email)
        .then((data) => {
          dispatch({type: FETCH_SUCCESS});
          // dispatch({type: UPDATE_AUTH_USER, payload: data});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onGetFirebaseSignInUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .onAuthStateChanged()
        .then((authUser) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_AUTH_USER,
            payload: getUserObject(authUser),
          });
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

const getUserObject = (authUser) => {
  return {
    authType: AuthType.FIREBASE,
    role: defaultUser.role,
    uid: authUser.uid,
    displayName: authUser.displayName,
    email: authUser.email,
    photoURL: authUser.photoURL,
    token: authUser.refreshToken,
    id: authUser.id,
  };
};
export const onSignInFirebaseUser = (email, password) => {
  return (dispatch) => {
    try {
      dispatch({type: FETCH_START});
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          loginUser(email, password).then((res) => {
            console.log(res);
            if (res.data) {
              let tokens = res.data.tokens;
              localStorage.setItem(ACCESS_TOKEN, tokens.access.token);
              localStorage.setItem(REFRESH_TOKEN, tokens.refresh.token);
              if (!res.data.user.isEmailVerified) {
                sendVerificationEmail(tokens.access.token).then((res) => {
                  if (res.data != 1) {
                    dispatch({type: FETCH_SUCCESS});
                    dispatch({
                      type: UPDATE_AUTH_USER,
                      payload: getUserObject({...data, ...res.data.user}),
                    });
                  }
                });
              } else {
                dispatch({type: FETCH_SUCCESS});
                dispatch({
                  type: UPDATE_AUTH_USER,
                  payload: getUserObject({...data, ...res.data.user}),
                });
              }
            }
          });
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const onSignOutFirebaseUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .signOut()
        .then((data) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_AUTH_USER, payload: null});
          localStorage.clear();
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const signInUserWithGoogle = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .signInWithPopup(googleAuthProvider)
        .then((data) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_AUTH_USER, payload: getUserObject(data.user)});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
export const signInUserWithGithub = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .signInWithPopup(githubAuthProvider)
        .then((data) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_AUTH_USER, payload: getUserObject(data.user)});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const signInUserWithFacebook = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .signInWithPopup(facebookAuthProvider)
        .then((data) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_AUTH_USER, payload: getUserObject(data.user)});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};

export const signInUserWithTwitter = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      auth
        .signInWithPopup(twitterAuthProvider)
        .then((data) => {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_AUTH_USER, payload: getUserObject(data.user)});
        })
        .catch((error) => {
          dispatch({type: FETCH_ERROR, payload: error.message});
        });
    } catch (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
};
