import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_RESULTS,
  FETCH_NOTIFICATIONS_ERROR,
  FETCH_NOTIFICATIONS_NEW_PAGE
} from './constants';

/**
 * Notifications reducer
 * @function notificationsReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null)
        .setIn(['search', 'searchValue'], null);
    case FETCH_NOTIFICATIONS_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data.rows || [] : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_NOTIFICATIONS_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_NOTIFICATIONS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default notificationsReducer;
