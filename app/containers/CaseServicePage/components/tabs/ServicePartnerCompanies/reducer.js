import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SEARCH_PARTNER_COMPANY_RESULTS,
  SEARCH_PARTNER_COMPANY_ERROR,
  SEARCH_PARTNER_COMPANY_START,
  FETCH_PARTNER_COMPANY_START,
  FETCH_PARTNER_COMPANY_RESULTS,
  FETCH_PARTNER_COMPANY_ERROR,
  SINGLE_PARTNER_COMPANY_START,
  SINGLE_PARTNER_COMPANY_ERROR,
  SINGLE_PARTNER_COMPANY_RESULTS,
  SAVE_PARTNER_COMPANY_START,
  SAVE_PARTNER_COMPANY_SUCCESS,
  SAVE_PARTNER_COMPANY_ERROR,
  FETCH_PARTNER_COMPANY_NEW_PAGE
} from './constants';

/**
 * Partner Company reducer
 * @function partnerCompaniesReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function partnerCompaniesReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PARTNER_COMPANY_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_PARTNER_COMPANY_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_PARTNER_COMPANY_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_PARTNER_COMPANY_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_PARTNER_COMPANY_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_PARTNER_COMPANY_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_PARTNER_COMPANY_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_PARTNER_COMPANY_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_PARTNER_COMPANY_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], !!action.id)
        .setIn(['single', 'error'], null);
    case SINGLE_PARTNER_COMPANY_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_PARTNER_COMPANY_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default partnerCompaniesReducer;
