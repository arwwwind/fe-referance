import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_SINGLE_CONTACT_START,
  FETCH_SINGLE_CONTACT_ERROR,
  FETCH_SINGLE_CONTACT_SUCCESS,
  CONTACT_OVERVIEW_START,
  CONTACT_OVERVIEW_ERROR,
  CONTACT_OVERVIEW_SUCCESS
} from './constants';

function contactDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_CONTACT_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_SINGLE_CONTACT_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_SINGLE_CONTACT_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : {}))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case CONTACT_OVERVIEW_START:
      return Map(state)
        .setIn(['overview', 'loading'], true)
        .setIn(['overview', 'error'], null);
    case CONTACT_OVERVIEW_ERROR:
      return Map(state)
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], fromJS(action.error));
    case CONTACT_OVERVIEW_SUCCESS:
      return Map(state)
        .setIn(['overview', 'id'], action.id)
        .setIn(['overview', 'data'], fromJS(action.data ? action.data : {}))
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], null);
    default:
      return state;
  }
}

export default contactDetailsReducer;
