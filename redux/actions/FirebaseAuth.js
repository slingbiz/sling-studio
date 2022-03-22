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
  UPDATE_NEW_SIGNUP,
  UPDATE_NEW_USER_STATUS,
} from '../../shared/constants/ActionTypes';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {
  loginUser,
  registerUser,
  sendVerificationEmail,
} from '../../@sling/services/auth/backend/index';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../shared/constants/General';

export const onSignUpFirebaseUser = ({email, password, name}) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    try {
      const regUser = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await regUser.user.sendEmailVerification();
      await registerUser(name, email, password);
      dispatch({type: FETCH_SUCCESS});
      localStorage.setItem('newUser', 'true');
      dispatch({
        type: UPDATE_NEW_SIGNUP,
        payload: getUserObject({...regUser.user}),
      });
      // return regUser;
      // sendVerificationEmail(tokens.access.token).then((ress) => {
      //   if (ress.status == 204) {
      //     dispatch({type: FETCH_SUCCESS});
      //     dispatch({
      //       type: UPDATE_NEW_SIGNUP,
      //       payload: getU
      //       serObject({...data, ...res.data.user}),
      //     });
      //   }
      // });
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
  console.log(authUser, 'authUser @getUserObject');
  return {
    authType: AuthType.FIREBASE,
    role: defaultUser.role,
    uid: authUser.uid,
    displayName: authUser.displayName,
    email: authUser.email,
    photoURL: authUser.photoURL,
    token: authUser.refreshToken,
    // id: authUser.id || authUser.uid,
  };
};
export const onSignInFirebaseUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCH_START});
      const regUser = await auth.signInWithEmailAndPassword(email, password);
      const {user: loggedInUser} = regUser;
      if (!loggedInUser.emailVerified) {
        await loggedInUser.sendEmailVerification();
      }
      localStorage.setItem('newUser', 'false');
      dispatch({type: UPDATE_NEW_USER_STATUS, payload: 'false'});

      //Update session in Sling. Not needed. To be removed.
      await loginUser(email, password);
      dispatch({type: FETCH_SUCCESS});
      dispatch({
        type: UPDATE_AUTH_USER,
        payload: getUserObject({...loggedInUser}),
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
