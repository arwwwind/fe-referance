import { fromJS } from 'immutable';
import initialState from './initialState';
import {
  SHOW_CLAIMS_START,
  SHOW_CLAIMS_SUCCESS,
  SHOW_CLAIMS_ERROR,
} from './constants';

/**
 * Show claims reducer
 * @function showClaimsReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function showClaimsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CLAIMS_START:
      return state
        .set('id', action.id)
        .set('loading', true)
        .set('error', null);
    case SHOW_CLAIMS_SUCCESS:
      return state
        .set('data', fromJS(action.data ? action.data : []))
        .set('loading', false)
        .set('error', null);
    case SHOW_CLAIMS_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    default:
      return state;
  }
}

export default showClaimsReducer;
