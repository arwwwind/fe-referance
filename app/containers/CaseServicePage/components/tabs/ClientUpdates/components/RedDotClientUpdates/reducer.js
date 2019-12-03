import { fromJS } from 'immutable';
import initialState from './initialState';
import {
  STATUS_CLIENT_UPDATES_START,
  STATUS_CLIENT_UPDATES_ERROR,
  STATUS_CLIENT_UPDATES_SUCCESS
} from './constants';

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_CLIENT_UPDATES_START:
      return state
        .set('caseId', action.caseId)
        .set('serviceId', action.serviceId)
        .set('loading', true)
        .set('error', null);
    case STATUS_CLIENT_UPDATES_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));
    case STATUS_CLIENT_UPDATES_SUCCESS:
      return state
        .set('redDot', action.redDot)
        .set('lastUpdate', action.lastUpdate)
        .set('nextUpdate', action.nextUpdate)
        .set('daysOverdue', action.daysOverdue)
        .set('loading', false)
        .set('error', null);
    default:
      return state;
  }
}

export default serviceReducer;
