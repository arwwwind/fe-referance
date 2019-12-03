import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SINGLE_EVENT_START,
  SINGLE_EVENT_ERROR,
  SINGLE_EVENT_SUCCESS,
  SAVE_EVENT_START,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_ERROR
} from './constants';

function serviceViewFormReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_EVENT_START:
      return Map(state)
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_EVENT_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_EVENT_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_EVENT_START:
      return Map(state)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_EVENT_SUCCESS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_EVENT_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default serviceViewFormReducer;
