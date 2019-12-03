import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_HOLD_SERVICE_START,
  FETCH_HOLD_SERVICE_START,
  FETCH_HOLD_SERVICE_SUCCESS,
  FETCH_HOLD_SERVICE_ERROR,
  FETCH_HOLD_SERVICE_NEW_PAGE,
  RESET_HOLD_SERVICE_DATA
} from './constants';

/**
 * HoldService reducer
 * @function liensReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function holdServiceReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_HOLD_SERVICE_DATA:
      return Map(state)
        .setIn(['data'], fromJS([]))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], null);
    case SEARCH_HOLD_SERVICE_START:
      return Map(state)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], action.searchValue);
    case FETCH_HOLD_SERVICE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_HOLD_SERVICE_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_HOLD_SERVICE_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_HOLD_SERVICE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default holdServiceReducer;
