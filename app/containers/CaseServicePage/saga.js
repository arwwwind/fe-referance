import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import { FETCH_SERVICE_START } from './constants';
import {
  fetchServiceError,
  fetchServiceData
} from './actions';
import config from '../../config';
import { getServiceId, getCaseId } from '../../utils/router';

export function* serviceFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`cases/${getCaseId(path)}/services/${getServiceId(path)}`));
    const { data } = response.data;
    yield put(fetchServiceData(data));
  } catch (error) {
    try {
      yield put(fetchServiceError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchServiceError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SERVICE_START, serviceFetch);
}
