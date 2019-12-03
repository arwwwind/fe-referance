import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios';
import config from '../../../../config';
import * as errors from '../../../../utils/errors';
import { SINGLE_EVENT_RATE_START, SAVE_EVENT_RATE_START } from './constants';
import { hideDrawer, showDrawer } from '../../../../components/Core/Drawer/actions';
import { singleEventRateSuccess, singleEventRateError, saveEventRateSuccess, saveEventRateError } from './actions';
import { showNotification } from '../../../App/actions';

/**
 * Show event drawer form
 * @function showEventRateDrawer
 */
export function* showEventRateDrawer(action) {
  yield put(showDrawer(`event-rate-form-${action.eventId}`));
  try {
    const response = yield call(() => axios.get(`in-person-events/${action.eventId}`));
    yield put(singleEventRateSuccess(response.data.data));
  } catch (error) {
    try {
      yield put(singleEventRateError(error.response.data.errors));
    } catch (internal) {
      yield put(singleEventRateError(config.generalError));
    }
  }
}

/**
 * Update event
 * @function updateEventRate
 */
export function* updateEventRate(action) {
  try {
    const response = yield call(() => axios.put(`in-person-events/${action.eventId}`, action.data));
    yield put(saveEventRateSuccess(response.data.data));
    yield put(hideDrawer(`event-rate-form-${action.eventId}`));
    action.form.resetFields();
  } catch (error) {
    try {
      yield put(saveEventRateError(error.response.data.errors));
      errors.display(action.form, error.response.data.errors, action.data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveEventRateError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export default function* saga() {
  yield takeLatest(SINGLE_EVENT_RATE_START, showEventRateDrawer);
  yield takeLatest(SAVE_EVENT_RATE_START, updateEventRate);
}
