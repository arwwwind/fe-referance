import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_CASE_START,
  FETCH_CASE_START,
  FETCH_CASE_SUCCESS,
  FETCH_CASE_ERROR,
  SINGLE_CASE_START,
  SINGLE_CASE_ERROR,
  SINGLE_CASE_SUCCESS,
  SAVE_CASE_START,
  SAVE_CASE_SUCCESS,
  SAVE_CASE_ERROR,
  FETCH_CASE_NEW_PAGE,
  RESET_CASE_DATA,
  QUICK_VIEW_CHANGE,
} from './constants';
import { DEFAULT_VIEW } from './components/QuickView';

/**
 * Contact reducer
 * @function casesReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function casesReducer(state = initialState, action) {
  switch (action.type) {
    case QUICK_VIEW_CHANGE:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['data'], fromJS([]))
        .setIn(['fetch', 'quickView'], action.option);
    case RESET_CASE_DATA:
      return Map(state)
        .setIn(['data'], fromJS([]))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], null)
        .setIn(['fetch', 'quickView'], DEFAULT_VIEW);
    case SEARCH_CASE_START:
      return Map(state)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], action.searchValue);
    case FETCH_CASE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_CASE_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_CASE_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_CASE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_CASE_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'response'], null)
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_CASE_SUCCESS:
      return Map(state)
        .setIn(['save', 'response'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_CASE_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_CASE_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null)
        .setIn(['save', 'error'], null);
    case SINGLE_CASE_SUCCESS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_CASE_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default casesReducer;
