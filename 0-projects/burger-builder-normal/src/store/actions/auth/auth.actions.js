import { makeAuthRequest, isResponseSuccess } from "../../../utils/api/api";
import { API_REQUEST_TYPES, API_REQUEST_URLS } from "../../../utils/constants";
import * as actionTypes from "./types";

const APP_KEY = process.env.REACT_APP_WEB_API_KEY;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  // return {
  //   type: actionTypes.AUTH_LOGOUT
  // };
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = API_REQUEST_URLS.signup;

    if (!isSignup) {
      url = API_REQUEST_URLS.signin;
    }

    const response = await makeAuthRequest(
      `${url}${APP_KEY}`,
      API_REQUEST_TYPES.post,
      authData
    );

    if (!isResponseSuccess(response)) {
      console.error("Error: ", response);
      dispatch(authFail(response));
      return;
    }

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", response.data.localId);
    dispatch(authSuccess(response.data.idToken, response.data.localId));
    dispatch(checkAuthTimeout(response.data.expiresIn));
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
