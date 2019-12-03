import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_SINGLE_VENUE_START,
  FETCH_SINGLE_VENUE_ERROR,
  FETCH_SINGLE_VENUE_SUCCESS,
  SEARCH_JUDGE_START,
  FETCH_JUDGE_START,
  FETCH_JUDGE_SUCCESS,
  FETCH_JUDGE_NEW_PAGE,
  VENUE_OVERVIEW_START,
  VENUE_OVERVIEW_ERROR,
  VENUE_OVERVIEW_SUCCESS
} from './constants';

function venueDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_VENUE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_SINGLE_VENUE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_SINGLE_VENUE_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : {}))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case SEARCH_JUDGE_START:
      return Map(state)
        .setIn(['judgesFetch', 'currentPage'], 1)
        .setIn(['judgesFetch', 'searchValue'], action.searchValue);
    case FETCH_JUDGE_START:
      return Map(state)
        .setIn(['judgesFetch', 'loading'], true)
        .setIn(['judgesFetch', 'error'], null);
    case FETCH_JUDGE_NEW_PAGE:
      return Map(state)
        .setIn(['judgesFetch', 'currentPage'], action.page);
    case FETCH_JUDGE_SUCCESS:
      return Map(state)
        .setIn(['judgesFetch', 'data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['judgesFetch', 'loading'], false)
        .setIn(['judgesFetch', 'error'], null)
        .setIn(['judgesFetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case VENUE_OVERVIEW_START:
      return Map(state)
        .setIn(['overview', 'loading'], true)
        .setIn(['overview', 'error'], null);
    case VENUE_OVERVIEW_ERROR:
      return Map(state)
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], fromJS(action.error));
    case VENUE_OVERVIEW_SUCCESS:
      return Map(state)
        .setIn(['overview', 'id'], action.id)
        .setIn(['overview', 'data'], fromJS(action.data ? action.data : {}))
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], null);
    default:
      return state;
  }
}

export default venueDetailsReducer;
