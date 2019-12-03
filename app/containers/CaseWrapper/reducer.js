import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  FETCH_CASE_DETAILS_START,
  FETCH_CASE_DETAILS_ERROR,
  FETCH_CASE_DETAILS_RESULTS,
  REQUEST_DELETE_OPEN_MODAL,
  REQUEST_DELETE_CLOSE_MODAL,
  CASE_DELETE_START,
  CASE_DELETE_SUCCESS,
  CASE_DELETE_ERROR,
  SERVICE_DELETE_START,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_ERROR,
  SERVICE_REASON_OPEN_DRAWER,
  SERVICE_REASON_START,
  SERVICE_REASON_SUCCESS,
  SERVICE_REASON_ERROR
} from './constants';

function caseDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CASE_DETAILS_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_CASE_DETAILS_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case FETCH_CASE_DETAILS_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data ? action.data : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null);
    case REQUEST_DELETE_OPEN_MODAL:
      return Map(state)
        .setIn(['delete', 'id'], action.id)
        .setIn(['delete', 'entity'], action.entity)
        .setIn(['delete', 'visible'], true);
    case REQUEST_DELETE_CLOSE_MODAL:
      return Map(state)
        .setIn(['delete', 'visible'], false);
    case CASE_DELETE_START:
      return Map(state)
        .setIn(['delete', 'error'], null)
        .setIn(['delete', 'loading'], true);
    case CASE_DELETE_ERROR:
      return Map(state)
        .setIn(['delete', 'error'], fromJS(action.error))
        .setIn(['delete', 'loading'], false);
    case CASE_DELETE_SUCCESS:
      return Map(state)
        .setIn(['delete', 'visible'], false)
        .setIn(['delete', 'error'], null)
        .setIn(['delete', 'loading'], false);
    case SERVICE_DELETE_START:
      return Map(state)
        .setIn(['delete', 'error'], null)
        .setIn(['delete', 'loading'], true);
    case SERVICE_DELETE_ERROR:
      return Map(state)
        .setIn(['delete', 'error'], fromJS(action.error))
        .setIn(['delete', 'loading'], false);
    case SERVICE_DELETE_SUCCESS:
      return Map(state)
        .setIn(['delete', 'visible'], false)
        .setIn(['delete', 'error'], null)
        .setIn(['delete', 'loading'], false);
    case SERVICE_REASON_START:
      return Map(state)
        .setIn(['reason', 'error'], null)
        .setIn(['reason', 'loading'], true);
    case SERVICE_REASON_SUCCESS:
      return Map(state)
        .setIn(['reason', 'reasonType'], null)
        .setIn(['reason', 'error'], null)
        .setIn(['reason', 'loading'], false);
    case SERVICE_REASON_ERROR:
      return Map(state)
        .setIn(['reason', 'error'], action.error)
        .setIn(['reason', 'loading'], false);
    case SERVICE_REASON_OPEN_DRAWER:
      return Map(state)
        .setIn(['reason', 'reasonType'], action.reasonType);
    default:
      return state;
  }
}

export default caseDetailsReducer;
