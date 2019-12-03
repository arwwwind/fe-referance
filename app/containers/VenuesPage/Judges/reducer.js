import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_JUDGE_RESULTS,
  SEARCH_JUDGE_ERROR,
  SEARCH_JUDGE_START,
  FETCH_JUDGE_START,
  FETCH_JUDGE_RESULTS,
  FETCH_JUDGE_ERROR,
  SINGLE_JUDGE_START,
  SINGLE_JUDGE_ERROR,
  SINGLE_JUDGE_RESULTS,
  SAVE_JUDGE_START,
  SAVE_JUDGE_SUCCESS,
  SAVE_JUDGE_ERROR,
  FETCH_JUDGE_NEW_PAGE
} from './constants';

/**
 * Judge reducer
 * @function judgesReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function judgesReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_JUDGE_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_JUDGE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_JUDGE_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_JUDGE_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_JUDGE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_JUDGE_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_JUDGE_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_JUDGE_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_JUDGE_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], !!action.id)
        .setIn(['single', 'error'], null);
    case SINGLE_JUDGE_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_JUDGE_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default judgesReducer;
