import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_SERVICE_START,
  FETCH_SERVICE_ERROR,
  FETCH_SERVICE_SUCCESS
} from './constants';

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_SERVICE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_SERVICE_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    default:
      return state;
  }
}

export default serviceReducer;
