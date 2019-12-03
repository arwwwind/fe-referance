import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_CALENDAR_WIDGET_START,
  FETCH_CALENDAR_WIDGET_START,
  FETCH_CALENDAR_WIDGET_RESULTS,
  FETCH_CALENDAR_WIDGET_ERROR,
  FETCH_CALENDAR_WIDGET_NEW_PAGE
} from './constants';

/**
 * CalendarWidget reducer
 * @function calendarWidgetReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function calendarWidgetReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CALENDAR_WIDGET_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.data);
    case FETCH_CALENDAR_WIDGET_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null)
        .setIn(['search', 'searchValue'], null);
    case FETCH_CALENDAR_WIDGET_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_CALENDAR_WIDGET_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_CALENDAR_WIDGET_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default calendarWidgetReducer;
