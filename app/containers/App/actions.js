import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_START,
  SHOW_NOTIFICATION,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  SEND_PROFILE_IMAGE_TO_STATE,
  SHOW_DROPDOWN,
  HIDE_DROPDOWN
} from './constants';

export function logoutStart() {
  return {
    type: LOGOUT_START
  };
}

export function loginStart({ email, password }) {
  return {
    type: LOGIN_START,
    email,
    password
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function loginSuccess({ user, token, redirect }) {
  return {
    type: LOGIN_SUCCESS,
    user,
    token,
    redirect
  };
}

export function showNotification(options) {
  return {
    type: SHOW_NOTIFICATION,
    ...options
  };
}

export function updateProfileStart(data, form) {
  return {
    type: UPDATE_PROFILE_START,
    data,
    form
  };
}

export function updateProfileSuccess(data) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    data
  };
}

export function updateProfileError(error) {
  return {
    type: UPDATE_PROFILE_ERROR,
    error
  };
}

export function showDropdown() {
  return {
    type: SHOW_DROPDOWN
  };
}

export function hideDropdown() {
  return {
    type: HIDE_DROPDOWN
  };
}

export function sendProfileImageToState(image) {
  return {
    type: SEND_PROFILE_IMAGE_TO_STATE,
    image
  };
}
