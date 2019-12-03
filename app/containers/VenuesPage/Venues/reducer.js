import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_VENUE_RESULTS,
  SEARCH_VENUE_ERROR,
  SEARCH_VENUE_START,
  FETCH_VENUE_START,
  FETCH_VENUE_RESULTS,
  FETCH_VENUE_ERROR,
  SINGLE_VENUE_START,
  SINGLE_VENUE_ERROR,
  SINGLE_VENUE_RESULTS,
  SAVE_VENUE_START,
  SAVE_VENUE_SUCCESS,
  SAVE_VENUE_ERROR,
  FETCH_VENUE_NEW_PAGE
} from './constants';

/**
 * Venue reducer
 * @function venuesReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function venuesReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_VENUE_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_VENUE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_VENUE_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_VENUE_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_VENUE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_VENUE_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_VENUE_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_VENUE_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_VENUE_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], !!action.id)
        .setIn(['single', 'error'], null);
    case SINGLE_VENUE_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_VENUE_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default venuesReducer;
