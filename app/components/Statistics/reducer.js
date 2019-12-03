import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_RESULTS,
  FETCH_STATISTICS_ERROR,
  FETCH_STATISTICS_NEW_PAGE
} from './constants';

/**
 * Statistics reducer
 * @function statisticsReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function statisticsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATISTICS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_STATISTICS_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case FETCH_STATISTICS_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_STATISTICS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default statisticsReducer;
