import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import axios from '../../axios';
import config from '../../config';
import { RESET_PASSWORD_START } from './constants';
import { resetPasswordSuccess, resetPasswordError } from './actions';
import { loginSuccess } from '../App/actions';

/**
 * Reset password start
 * @function resetPasswordStartSaga
 */
export function* resetPasswordStartSaga(action) {
  try {
    const { email, password, passwordConfirmation } = action;
    const response = yield call(() => axios.post(`reset-password/${window.location.toString().slice(-60)}`, { email, password, passwordConfirmation }));
    const receivedData = response.data.data;

    yield put(resetPasswordSuccess(receivedData));
    yield put(loginSuccess(_.assign(receivedData, { redirect: config.homepage })));
  } catch (error) {
    try {
      yield put(resetPasswordError(error.response.data.errors));
    } catch (internal) {
      yield put(resetPasswordError(config.generalError));
    }
  }
}

/**
 * Saga users form
 * @function usersFormSaga
 */
export default function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_START, resetPasswordStartSaga);
}
