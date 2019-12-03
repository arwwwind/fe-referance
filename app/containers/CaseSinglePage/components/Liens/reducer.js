import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_LIEN_START,
  FETCH_LIEN_START,
  FETCH_LIEN_SUCCESS,
  FETCH_LIEN_ERROR,
  SINGLE_LIEN_START,
  SINGLE_LIEN_ERROR,
  SINGLE_LIEN_SUCCESS,
  SAVE_LIEN_START,
  SAVE_LIEN_SUCCESS,
  SAVE_LIEN_ERROR,
  FETCH_LIEN_NEW_PAGE,
  RESET_LIEN_DATA,
  STATISTICS_LIEN_START,
  STATISTICS_LIEN_SUCCESS,
  STATISTICS_LIEN_ERROR
} from './constants';
import { GO_TO_STEP } from '../SaveService/constants';

/**
 * Lien reducer
 * @function liensReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function liensReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_LIEN_DATA:
      return Map(state)
        .setIn(['data'], fromJS([]))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], null);
    case SEARCH_LIEN_START:
      return Map(state)
        .setIn(['fetch', 'currentPage'], 1)
        .setIn(['fetch', 'searchValue'], action.searchValue);
    case FETCH_LIEN_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_LIEN_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_LIEN_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_LIEN_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_LIEN_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'response'], null)
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_LIEN_SUCCESS:
      return Map(state)
        .setIn(['save', 'response'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_LIEN_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_LIEN_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_LIEN_SUCCESS:
      return Map(state)
        .set('step', 1)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_LIEN_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    case GO_TO_STEP:
      return Map(state).set('step', action.step);
    case STATISTICS_LIEN_START:
      return Map(state)
        .setIn(['statistics', 'loading'], true)
        .setIn(['statistics', 'error'], null);
    case STATISTICS_LIEN_SUCCESS:
      return Map(state)
        .setIn(['statistics', 'data'], fromJS(action.data))
        .setIn(['statistics', 'loading'], false)
        .setIn(['statistics', 'error'], null);
    case STATISTICS_LIEN_ERROR:
      return Map(state)
        .setIn(['statistics', 'loading'], false)
        .setIn(['statistics', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default liensReducer;
