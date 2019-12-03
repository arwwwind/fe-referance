import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import { FETCH_SINGLE_CONTACT_START, CONTACT_OVERVIEW_START } from './constants';
import { fetchSingleContactError, fetchSingleContactSuccess, contactOverviewSuccess, contactOverviewError } from './actions';
import config from '../../config';

export function* singleContactFetch({ id }) {
  try {
    const response = yield call(() => axios.get(`contact-profiles/${id}`));
    yield put(fetchSingleContactSuccess(response.data.data));
  } catch (error) {
    try {
      yield put(fetchSingleContactError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchSingleContactError(config.generalError));
    }
  }
}

export function* contactOverviewStart({ id }) {
  try {
    const response = yield call(() => axios.get(`/metrics/contact/${id}/overview`));
    yield put(contactOverviewSuccess(id, response.data.data));
  } catch (error) {
    try {
      yield put(contactOverviewError(error.response.data.errors));
    } catch (internal) {
      yield put(contactOverviewError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SINGLE_CONTACT_START, singleContactFetch);
  yield takeLatest(CONTACT_OVERVIEW_START, contactOverviewStart);
}
