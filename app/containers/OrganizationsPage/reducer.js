import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SINGLE_ORGANIZATION_FORM_TYPE_CHANGE,
  SEARCH_ORGANIZATION_START,
  FETCH_ORGANIZATION_START,
  FETCH_ORGANIZATION_RESULTS,
  FETCH_ORGANIZATION_ERROR,
  SINGLE_ORGANIZATION_START,
  SINGLE_ORGANIZATION_ERROR,
  SINGLE_ORGANIZATION_RESULTS,
  SAVE_ORGANIZATION_START,
  SAVE_ORGANIZATION_SUCCESS,
  SAVE_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_NEW_PAGE
} from './constants';

/**
 * Organization reducer
 * @function organizationsReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function organizationsReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_ORGANIZATION_FORM_TYPE_CHANGE:
      return Map(state)
        .setIn(['single', 'type'], action.organizationType);
    case SEARCH_ORGANIZATION_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_ORGANIZATION_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_ORGANIZATION_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_ORGANIZATION_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_ORGANIZATION_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_ORGANIZATION_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_ORGANIZATION_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_ORGANIZATION_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_ORGANIZATION_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_ORGANIZATION_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_ORGANIZATION_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default organizationsReducer;
