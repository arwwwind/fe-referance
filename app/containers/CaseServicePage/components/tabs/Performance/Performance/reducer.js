import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_CASE_METRICS_START,
  FETCH_CASE_METRICS_ERROR,
  FETCH_CASE_METRICS_SUCCESS
} from './constants';

function caseMetricsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASE_METRICS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_CASE_METRICS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_CASE_METRICS_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : {}))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    default:
      return state;
  }
}

export default caseMetricsReducer;
