import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SINGLE_SERVICE_VIEW_START,
  SINGLE_SERVICE_VIEW_ERROR,
  SINGLE_SERVICE_VIEW_SUCCESS,
  SAVE_SERVICE_VIEW_START,
  SAVE_SERVICE_VIEW_SUCCESS,
  SAVE_SERVICE_VIEW_ERROR
} from './constants';

function serviceViewFormReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SERVICE_VIEW_START:
      return Map(state)
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_SERVICE_VIEW_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_SERVICE_VIEW_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_SERVICE_VIEW_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_SERVICE_VIEW_SUCCESS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_SERVICE_VIEW_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default serviceViewFormReducer;
