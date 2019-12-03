import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import { FETCH_CONTACT_METRICS_START } from './constants';
import { fetchContactMetricsError, fetchContactMetricsSuccess } from './actions';
import config from '../../config';

export function* contactMetricsFetch({ id }) {
  try {
    const response = yield call(() => axios.get(`/metrics/contact/${id}`));
    yield put(fetchContactMetricsSuccess(response.data.data));
  } catch (error) {
    try {
      yield put(fetchContactMetricsError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchContactMetricsError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CONTACT_METRICS_START, contactMetricsFetch);
}
