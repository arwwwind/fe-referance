import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_USER_RESULTS,
  SEARCH_USER_ERROR,
  SEARCH_USER_START,
  FETCH_USER_START,
  FETCH_USER_RESULTS,
  FETCH_USER_ERROR,
  SINGLE_USER_START,
  SINGLE_USER_ERROR,
  SINGLE_USER_RESULTS,
  SAVE_USER_START,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
  SWITCH_USER_STATUS_ERROR,
  SWITCH_USER_STATUS_START,
  SWITCH_USER_STATUS_SUCCESS
} from './constants';

/**
 * User reducer
 * @function usersReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value)
        .setIn(['search', 'loading'], true)
        .setIn(['search', 'error'], null);
    case SEARCH_USER_RESULTS:
      return Map(state)
        .setIn(['search', 'results'], fromJS(action.results))
        .setIn(['search', 'loading'], false)
        .setIn(['search', 'error'], null);
    case SEARCH_USER_ERROR:
      return Map(state)
        .setIn(['search', 'loading'], false)
        .setIn(['search', 'error'], fromJS(action.error));
    case FETCH_USER_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_USER_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case FETCH_USER_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_USER_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_USER_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_USER_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_USER_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], !!action.id)
        .setIn(['single', 'error'], null);
    case SINGLE_USER_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_USER_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    case SWITCH_USER_STATUS_START:
      return Map(state)
        .setIn(['switchUserStatus', 'loading'], true)
        .setIn(['switchUserStatus', 'error'], null);
    case SWITCH_USER_STATUS_SUCCESS:
      return Map(state)
        .setIn(['switchUserStatus', 'loading'], false)
        .setIn(['switchUserStatus', 'error'], null);
    case SWITCH_USER_STATUS_ERROR:
      return Map(state)
        .setIn(['switchUserStatus', 'loading'], false)
        .setIn(['switchUserStatus', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default usersReducer;
