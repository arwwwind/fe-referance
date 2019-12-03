import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_TRACKS_START,
  FETCH_TRACKS_RESULTS,
  FETCH_TRACKS_ERROR,
  MOVE_TRACKS_START,
  MOVE_TRACKS_RESULTS,
  MOVE_TRACKS_ERROR,
  SINGLE_TRACKS_START,
  SINGLE_TRACKS_RESULTS,
  SINGLE_TRACKS_ERROR,
  SAVE_TRACKS_START,
  SAVE_TRACKS_SUCCESS,
  SAVE_TRACKS_ERROR,
  DELETE_TRACKS_START,
  DELETE_TRACKS_SUCCESS,
  DELETE_TRACKS_ERROR
} from './constants';

/**
 * Tasks reducer
 * @function tasksReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACKS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_TRACKS_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case FETCH_TRACKS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case MOVE_TRACKS_START:
      return Map(state)
        .setIn(['move', 'data'], fromJS(action.data))
        .setIn(['move', 'loading'], true)
        .setIn(['move', 'error'], null);
    case MOVE_TRACKS_RESULTS:
      return Map(state)
        .setIn(['move', 'loading'], false)
        .setIn(['move', 'error'], null);
    case MOVE_TRACKS_ERROR:
      return Map(state)
        .setIn(['move', 'loading'], false)
        .setIn(['move', 'error'], fromJS(action.error));
    case SINGLE_TRACKS_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['boardID'], action.boardID)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_TRACKS_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_TRACKS_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    case SAVE_TRACKS_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_TRACKS_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_TRACKS_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case DELETE_TRACKS_START:
      return Map(state)
        .setIn(['delete', 'loading'], true)
        .setIn(['delete', 'error'], null);
    case DELETE_TRACKS_SUCCESS:
      return Map(state)
        .setIn(['delete', 'loading'], false)
        .setIn(['delete', 'error'], null);
    case DELETE_TRACKS_ERROR:
      return Map(state)
        .setIn(['delete', 'loading'], false)
        .setIn(['delete', 'error'], fromJS(action.error));
    default:
      return state;
  }
}

export default tasksReducer;
