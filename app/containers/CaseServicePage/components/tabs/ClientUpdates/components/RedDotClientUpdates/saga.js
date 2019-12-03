import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../../../axios';
import { STATUS_CLIENT_UPDATES_START } from './constants';
import { statusClientUpdatesError, statusClientUpdatesData } from './actions';
import config from '../../../../../../../config';
import { showNotification } from '../../../../../../App/actions';
import { getLastUpdate, getNextUpdate, getDaysOverdue, getRedDot } from './methods';

export function* statusClientUpdatesStartSaga({ caseId, serviceId }) {
  try {
    const response = yield call(() => axios.get(`cases/${caseId}/services/${serviceId}/client-updates`, {
      params: { page: 1 }
    }));
    const { data } = response.data;
    const { rows } = data;
    const firstRow = rows.length ? rows[0] : null;
    yield put(statusClientUpdatesData({
      redDot: getRedDot(firstRow),
      lastUpdate: getLastUpdate(firstRow),
      nextUpdate: getNextUpdate(firstRow),
      daysOverdue: getDaysOverdue(firstRow)
    }));
  } catch (error) {
    yield put(showNotification({
      key: 'client_updates_status',
      title: 'Client Updates Status',
      message: config.generalError.unknownError[0]
    }));
    try {
      yield put(statusClientUpdatesError(error.response.data.errors));
    } catch (internal) {
      yield put(statusClientUpdatesError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(STATUS_CLIENT_UPDATES_START, statusClientUpdatesStartSaga);
}
