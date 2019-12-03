import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_LIENS_START,
  FETCH_LIENS_RESULT,
  FETCH_LIENS_ERROR,
  EDIT_LIENS_START,
  EDIT_LIENS_RESULT,
  EDIT_LIENS_ERROR
} from './constants';

function eddLiensReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIENS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_LIENS_RESULT:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : []))
        .setIn(['chartData'], fromJS(action.chartData ? action.chartData : []))
        .setIn(['overlapDays'], action.overlapDays)
        .setIn(['amountOwned'], action.amountOwned)
        .setIn(['savings'], action.savings)
        .setIn(['fetch', 'loading'], false);
    case FETCH_LIENS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case EDIT_LIENS_START:
      return Map(state)
        .setIn(['edit', 'loading'], true)
        .setIn(['edit', 'error'], null);
    case EDIT_LIENS_RESULT:
      return Map(state)
        .setIn(['edit', 'data'], fromJS(action.data ? action.data : []))
        .setIn(['fetch', 'loading'], true);
    case EDIT_LIENS_ERROR:
      return Map(state)
        .setIn(['edit', 'loading'], true)
        .setIn(['edit', 'error'], null);
    default:
      return state;
  }
}

export default eddLiensReducer;
