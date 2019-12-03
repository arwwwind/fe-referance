import { fromJS } from 'immutable';
import initialState from './initialState';
import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from './constants';

/**
 * Reset password reducer
 * @function resetPasswordReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_START:
      return state
        .set('error', null)
        .set('loading', true);
    case RESET_PASSWORD_SUCCESS:
      return state
        .set('error', null)
        .set('loading', false);
    case RESET_PASSWORD_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    default:
      return state;
  }
}

export default resetPasswordReducer;
