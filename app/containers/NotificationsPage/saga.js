import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import config from '../../config';

import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_NEW_PAGE
} from './constants';
import {
  fetchNotificationsStart,
  fetchNotificationsData,
  fetchNotificationsError
} from './actions';
import { showNotification } from '../App/actions';

/**
 * Fetch notifications
 * @function notificationsFetch
 */
export function* notificationsFetch() {
  try {
    const page = yield select((data) => data.get('notifications').get('fetch').get('currentPage'));
    const response = yield call(() => axios.get('notifications', {
      params: {
        page
      }
    }));
    yield put(fetchNotificationsData(response.data.data));
  } catch (error) {
    try {
      yield put(fetchNotificationsError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchNotificationsError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* saga() {
  yield takeLatest(FETCH_NOTIFICATIONS_START, notificationsFetch);
  yield takeLatest(FETCH_NOTIFICATIONS_NEW_PAGE, notificationsFetch);

  yield put(fetchNotificationsStart());
}
