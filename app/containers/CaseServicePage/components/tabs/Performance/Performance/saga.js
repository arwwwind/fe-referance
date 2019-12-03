import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../../axios';
import { FETCH_CASE_METRICS_START } from './constants';
import { fetchCaseMetricsError, fetchCaseMetricsSuccess } from './actions';
import config from '../../../../../../config';

export function* caseMetricsFetch({ id }) {
  try {
    const response = yield call(() => axios.get(`/metrics/case/${id}`));
    yield put(fetchCaseMetricsSuccess(response.data.data));
  } catch (error) {
    try {
      yield put(fetchCaseMetricsError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchCaseMetricsError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CASE_METRICS_START, caseMetricsFetch);
}
