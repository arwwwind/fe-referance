import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_CLIENT_UPDATE_START,
  FETCH_CLIENT_UPDATE_START,
  FETCH_CLIENT_UPDATE_SUCCESS,
  FETCH_CLIENT_UPDATE_ERROR,
  FETCH_CLIENT_UPDATE_NEW_PAGE,
  RESET_CLIENT_UPDATE_DATA
} from './constants';

/**
 * ClientUpdate reducer
 * @function liensReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function clientUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_CLIENT_UPDATE_DATA:
      return Map(state)
        .setIn(['data'], fromJS([]))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], null);
    case SEARCH_CLIENT_UPDATE_START:
      return Map(state)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], action.searchValue);
    case FETCH_CLIENT_UPDATE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_CLIENT_UPDATE_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['caseId'], action.caseId)
        .setIn(['serviceId'], action.serviceId)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_CLIENT_UPDATE_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_CLIENT_UPDATE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default clientUpdateReducer;
