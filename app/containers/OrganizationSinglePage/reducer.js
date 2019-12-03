import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_SINGLE_ORGANIZATION_START,
  FETCH_SINGLE_ORGANIZATION_ERROR,
  FETCH_SINGLE_ORGANIZATION_SUCCESS,
  ORGANIZATION_OVERVIEW_START,
  ORGANIZATION_OVERVIEW_SUCCESS,
  ORGANIZATION_OVERVIEW_ERROR
} from './constants';

function organizationDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_ORGANIZATION_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_SINGLE_ORGANIZATION_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_SINGLE_ORGANIZATION_SUCCESS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : {}))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case ORGANIZATION_OVERVIEW_START:
      return Map(state)
        .setIn(['overview', 'loading'], true)
        .setIn(['overview', 'error'], null);
    case ORGANIZATION_OVERVIEW_ERROR:
      return Map(state)
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], fromJS(action.error));
    case ORGANIZATION_OVERVIEW_SUCCESS:
      return Map(state)
        .setIn(['overview', 'id'], action.id)
        .setIn(['overview', 'data'], fromJS(action.data ? action.data : {}))
        .setIn(['overview', 'loading'], false)
        .setIn(['overview', 'error'], null);
    default:
      return state;
  }
}

export default organizationDetailsReducer;
