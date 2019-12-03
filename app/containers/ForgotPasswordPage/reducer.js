import { fromJS } from 'immutable';
import initialState from './initialState';
import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';

/**
 * Forgot password reducer
 * @function forgotPasswordReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_START:
      return state
        .set('error', null)
        .set('loading', true)
        .set('success', false);
    case FORGOT_PASSWORD_SUCCESS:
      return state
        .set('error', null)
        .set('loading', false)
        .set('success', true);
    case FORGOT_PASSWORD_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error))
        .set('success', true);
    default:
      return state;
  }
}

export default forgotPasswordReducer;
