import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_SINGLE_JUDGE_START,
  FETCH_SINGLE_JUDGE_ERROR,
  FETCH_SINGLE_JUDGE_SUCCESS,
  JUDGE_OVERVIEW_START,
  JUDGE_OVERVIEW_ERROR,
  JUDGE_OVERVIEW_SUCCESS
} from './constants';

function judgeDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_JUDGE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_SINGLE_JUDGE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_SINGLE_JUDGE_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : {}))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case JUDGE_OVERVIEW_START:
      return Map(state)
        .setIn(['overview', 'loading'], true)
        .setIn(['overview', 'error'], null);
    case JUDGE_OVERVIEW_ERROR:
      return Map(state)
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], fromJS(action.error));
    case JUDGE_OVERVIEW_SUCCESS:
      return Map(state)
        .setIn(['overview', 'id'], action.id)
        .setIn(['overview', 'data'], fromJS(action.data ? action.data : {}))
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], null);
    default:
      return state;
  }
}

export default judgeDetailsReducer;
