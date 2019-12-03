import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../config';
import { SHOW_CLAIMS_START } from './constants';
import { showClaimsSuccess, showClaimsError } from './actions';
import { showNotification } from '../../containers/App/actions';

/**
 * Fetch statistics
 * @function ShowClaimsStartSaga
 */
export function* showClaimsStartSaga({ id }) {
  try {
    const response = yield call(() => axios.get(`cases/${id}`));
    const { data } = response.data;
    const claims = data ? data.claims : [];

    yield put(showClaimsSuccess(claims || []));
  } catch (error) {
    try {
      yield put(showClaimsError(error.response.data.errors));
    } catch (internal) {
      yield put(showClaimsError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* saga() {
  yield takeLatest(SHOW_CLAIMS_START, showClaimsStartSaga);
}
