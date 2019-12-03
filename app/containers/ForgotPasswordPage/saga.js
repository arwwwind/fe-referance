import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import config from '../../config';
import { FORGOT_PASSWORD_START } from './constants';
import { forgotPasswordSuccess, forgotPasswordError } from './actions';
import { showNotification } from '../App/actions';

/**
 * Fetch users
 * @function usersFetch
 */
export function* forgotPasswordStartSaga(action) {
  try {
    const { email } = action;
    const response = yield call(() => axios.post('reset-password', email));
    yield put(forgotPasswordSuccess(response));
    yield put(showNotification({
      level: 'success',
      key: 'forgot_password_success',
      title: 'Forgot password',
      message: 'If the user is registered, a link to reset the password will be sent to the user’s email address.'
    }));
  } catch (error) {
    yield put(showNotification({
      key: 'forgot_password_success',
      title: 'Forgot password',
      message: config.generalError.unknownError[0]
    }));
    try {
      yield put(forgotPasswordError(error.response.data.errors));
    } catch (internal) {
      yield put(forgotPasswordError(config.generalError));
    }
  }
}

/**
 * Saga users
 * @function usersSaga
 */
export default function* usersSaga() {
  yield takeLatest(FORGOT_PASSWORD_START, forgotPasswordStartSaga);
}
