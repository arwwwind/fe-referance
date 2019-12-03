import { fromJS, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import initialState from './initialState';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  SEND_PROFILE_IMAGE_TO_STATE,
  SHOW_DROPDOWN,
  HIDE_DROPDOWN
} from './constants';

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return state
        .set('error', null)
        .set('loading', true);
    case LOGIN_SUCCESS:
      return state
        .set('token', action.token)
        .set('user', fromJS(action.user))
        .set('error', null)
        .set('loading', false);
    case LOGIN_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case UPDATE_PROFILE_START:
      return Map(state)
        .setIn(['updateProfile', 'error'], null)
        .setIn(['updateProfile', 'loading'], true);
    case SEND_PROFILE_IMAGE_TO_STATE:
      return Map(state)
        .setIn(['updateProfile', 'image'], action.image);
    case UPDATE_PROFILE_SUCCESS:
      return Map(state)
        .setIn(['user', 'loginEmail'], action.data.loginEmail)
        .setIn(['user', 'googleEmailLogin'], action.data.googleEmailLogin)
        .setIn(['user', 'profile', 'firstName'], action.data.firstName)
        .setIn(['user', 'profile', 'lastName'], action.data.lastName)
        .setIn(['user', 'profile', 'hasImage'], action.data.hasImage)
        .setIn(['updateProfile', 'error'], null)
        .setIn(['updateProfile', 'loading'], false);
    case UPDATE_PROFILE_ERROR:
      return Map(state)
        .setIn(['updateProfile', 'error'], fromJS(action.error))
        .setIn(['updateProfile', 'loading'], false);
    case SHOW_DROPDOWN:
      return Map(state)
        .setIn(['dropdown'], true);
    case LOCATION_CHANGE:
    case HIDE_DROPDOWN:
      return Map(state)
        .setIn(['dropdown'], false);
    default:
      return state;
  }
}

export default loginReducer;
