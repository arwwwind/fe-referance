import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SINGLE_SERVICE_START,
  SINGLE_SERVICE_ERROR,
  SINGLE_SERVICE_RESULTS,
  SAVE_SERVICE_START,
  SAVE_SERVICE_SUCCESS,
  SAVE_SERVICE_ERROR, GO_TO_STEP,
} from './constants';

/**
 * Service reducer
 * @function servicesReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function servicesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SERVICE_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null)
        .setIn(['save', 'serviceId'], action.serviceId)
        .setIn(['save', 'caseId'], action.caseId);
    case SAVE_SERVICE_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_SERVICE_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_SERVICE_START:
      return Map(state)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null)
        .setIn(['single', 'serviceId'], action.serviceId)
        .setIn(['single', 'caseId'], action.caseId)
        .setIn(['save', 'error'], null);
    case SINGLE_SERVICE_RESULTS:
      return Map(state)
        .set('step', 1)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_SERVICE_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    case GO_TO_STEP:
      return Map(state).set('step', action.step);
    default:
      return state;
  }
}

export default servicesReducer;
