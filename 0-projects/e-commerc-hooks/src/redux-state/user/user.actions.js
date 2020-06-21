import { USER_ACTION_TYPES } from './user.types';

export const googleSingInStart = () => ({
  type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
});

export const emailSingInStart = (data) => ({
  type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  payload: data,
});

export const signInSuccess = (user) => ({
  type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_IN_FAILURE,
  payload: errorMsg,
});

export const checkUserSession = () => ({
  type: USER_ACTION_TYPES.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_OUT_FAILURE,
  payload: errorMsg,
});

export const signUpStart = (userCredentials) => ({
  type: USER_ACTION_TYPES.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (errorMsg) => ({
  type: USER_ACTION_TYPES.SIGN_UP_FAILURE,
  payload: errorMsg,
});
