import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios';
import config from '../../../../config';
import * as errors from '../../../../utils/errors';
import { SINGLE_EVENT_START, SAVE_EVENT_START } from './constants';
import { hideDrawer, showDrawer } from '../../../../components/Core/Drawer/actions';
import { singleEventSuccess, singleEventError, saveEventSuccess, saveEventError } from './actions';
import { showNotification } from '../../../App/actions';

/**
 * Show event drawer form
 * @function showEventDrawer
 */
export function* showEventDrawer(action) {
  yield put(showDrawer('event-form'));
  try {
    // const response = yield call(() => axios.get(`event/${action.caseId}/events/${action.eventId}`));
    // const response = yield call(() => axios.get(`/in-person-events?entity=case&entityId=1`));
    yield put(singleEventSuccess({})); // response.data.data
  } catch (error) {
    try {
      yield put(singleEventError(error.response.data.errors));
    } catch (internal) {
      yield put(singleEventError(config.generalError));
    }
  }
}

/**
 * Update event
 * @function updateEvent
 */
export function* updateEvent(action) {
  try {
    const response = yield call(() => axios.post('/in-person-events', action.data));
    yield put(saveEventSuccess(response.data));
    yield put(hideDrawer('event-form'));
    action.form.resetFields();
  } catch (error) {
    try {
      yield put(saveEventError(error.response.data.errors));
      errors.display(action.form, error.response.data.errors, action.data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveEventError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export default function* saga() {
  yield takeLatest(SINGLE_EVENT_START, showEventDrawer);
  yield takeLatest(SAVE_EVENT_START, updateEvent);
}
