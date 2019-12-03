import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_CALENDAR_START,
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_RESULTS,
  FETCH_CALENDAR_ERROR,
  FETCH_CALENDAR_NEW_PAGE
} from './constants';

/**
 * Calendar reducer
 * @function calendarReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CALENDAR_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.data);
    case FETCH_CALENDAR_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null)
        .setIn(['search', 'searchValue'], {});
    case FETCH_CALENDAR_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_CALENDAR_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_CALENDAR_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default calendarReducer;
