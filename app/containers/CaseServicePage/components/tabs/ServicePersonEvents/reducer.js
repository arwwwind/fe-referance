import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_PERSON_EVENTS_RESULTS,
  SEARCH_PERSON_EVENTS_ERROR,
  SEARCH_PERSON_EVENTS_START,
  FETCH_PERSON_EVENTS_START,
  FETCH_PERSON_EVENTS_RESULTS,
  FETCH_PERSON_EVENTS_ERROR,
  SINGLE_PERSON_EVENTS_START,
  SINGLE_PERSON_EVENTS_ERROR,
  SINGLE_PERSON_EVENTS_RESULTS,
  SAVE_PERSON_EVENTS_START,
  SAVE_PERSON_EVENTS_SUCCESS,
  SAVE_PERSON_EVENTS_ERROR,
  FETCH_PERSON_EVENTS_NEW_PAGE
} from './constants';

/**
 * Person Event reducer
 * @function personEventsReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function personEventsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PERSON_EVENTS_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_PERSON_EVENTS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_PERSON_EVENTS_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_PERSON_EVENTS_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_PERSON_EVENTS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_PERSON_EVENTS_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_PERSON_EVENTS_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_PERSON_EVENTS_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_PERSON_EVENTS_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], !!action.id)
        .setIn(['single', 'error'], null);
    case SINGLE_PERSON_EVENTS_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_PERSON_EVENTS_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default personEventsReducer;
