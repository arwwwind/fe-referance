import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_CONTACT_START,
  FETCH_CONTACT_START,
  FETCH_CONTACT_RESULTS,
  FETCH_CONTACT_ERROR,
  SINGLE_CONTACT_START,
  SINGLE_CONTACT_ERROR,
  SINGLE_CONTACT_RESULTS,
  SAVE_CONTACT_START,
  SAVE_CONTACT_SUCCESS,
  SAVE_CONTACT_ERROR,
  FETCH_CONTACT_NEW_PAGE,
  SINGLE_CONTACT_FORM_TYPE_CHANGE,
  QUICK_VIEW_CHANGE
} from './constants';

/**
 * Contact reducer
 * @function contactsReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case QUICK_VIEW_CHANGE:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['data'], fromJS([]))
        .setIn(['fetch', 'quickView'], action.option);
    case SINGLE_CONTACT_FORM_TYPE_CHANGE:
      return Map(state)
        .setIn(['single', 'type'], action.contactType);
    case SEARCH_CONTACT_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_CONTACT_START:
      return Map(state)
        .setIn(['fetch', 'sortId'], action.sortId)
        .setIn(['fetch', 'sortOrder'], action.sortOrder)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_CONTACT_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_CONTACT_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_CONTACT_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_CONTACT_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_CONTACT_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_CONTACT_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_CONTACT_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_CONTACT_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_CONTACT_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default contactsReducer;
