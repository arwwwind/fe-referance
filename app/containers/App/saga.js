import { put, takeLatest, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import { notification } from 'antd';
import extend from 'lodash/extend';
import isUndefined from 'lodash/isUndefined';
import store from 'store';
import axios, { NOT_AUTHENTICATED } from '../../axios';
import {
  LOGOUT_START,
  LOGIN_START,
  LOGIN_SUCCESS,
  SHOW_NOTIFICATION,
  UPDATE_PROFILE_START
} from './constants';
import { loginSuccess, loginError, updateProfileSuccess, updateProfileError, showNotification, sendProfileImageToState } from './actions';
import config from '../../config';
import * as errors from '../../utils/errors';
import { openDeleteModal } from '../CaseWrapper/actions';

const noLoginDataAction = loginSuccess({
  user: null,
  token: null
});

export function* loginCheckSaga() {
  const token = store.get(config.storeKey.token);
  const user = store.get(config.storeKey.user);

  if (token && user) {
    try {
      const response = yield call(() => axios.get(`users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }));
      yield put(loginSuccess({
        user: response.data.data,
        token
      }));
    } catch (e) {
      /**
       * this error will be handled by the interceptor
       */
    }
  } else {
    yield put(noLoginDataAction);
  }
}

export function* logoutStartSaga() {
  yield put(noLoginDataAction);
}

export function* loginStartSaga(action) {
  const { email, password } = action;

  try {
    const response = yield call(() => axios.post('auth/login', { email, password }));
    const { user, token } = response.data.data;

    yield put(loginSuccess({ user, token, redirect: config.homepage }));
  } catch (error) {
    try {
      yield put(loginError(error.response.data.errors));
    } catch (internal) {
      yield put(loginError(config.generalError));
    }
  }
}

export function* loginSuccessSaga({ user, token, redirect }) {
  store.set(config.storeKey.user, user);
  store.set(config.storeKey.token, token);

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }

  if (redirect) {
    yield put(push(redirect));
  }
}

export function* updateProfileStartSaga(action) {
  try {
    const {
      firstName, lastName, loginEmail, password, passwordConfirmation, file, imageUrl, googleEmailLogin
    } = action.data;

    // send form
    yield call(() => axios.put('account-settings', {
      firstName, lastName, loginEmail, googleEmailLogin, password, passwordConfirmation
    }));

    // send image
    const changeImage = !isUndefined(file);
    if (changeImage) {
      const data = new FormData();
      data.append('file', file);
      try {
        yield call(() => ((file === null) ? axios.delete('files/avatar') : axios.post('files/upload/avatar', data, { headers: { 'Content-Type': 'multipart/form-data' } })));
        yield put(sendProfileImageToState(imageUrl));
      } catch (error) {
        if (error.response.data.errors.general && error.response.data.errors.general.length) {
          yield put(showNotification({
            key: 'upload_avatar',
            title: 'Upload Error',
            message: error.response.data.errors.general.join(', ')
          }));
        } else {
          yield put(showNotification({
            key: 'upload_avatar',
            title: 'Upload Error',
          }));
        }
      }
    }

    // update user state
    const hasImage = changeImage ? (file !== null) : yield select((data) => data.get('app').get('user').get('profile').get('hasImage'));
    yield call(() => {
      const user = store.get(config.storeKey.user);
      extend(user.profile, { firstName, lastName });
      extend(user.profile, hasImage ? { hasImage } : undefined);
      extend(user, { loginEmail, googleEmailLogin });
      store.set(config.storeKey.user, user);
    });
    yield put(updateProfileSuccess({
      firstName, lastName, loginEmail, googleEmailLogin, hasImage
    }));
    yield put(showNotification({
      key: 'update_profile',
      level: 'success',
      title: 'Update profile',
      message: 'Your profile has been successfully updated'
    }));
  } catch (error) {
    try {
      yield put(updateProfileError(error.response.data.errors));
      errors.display(action.form, error.response.data.errors, action.data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          key: 'update_profile',
          title: 'Update profile',
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(showNotification());
      yield put(updateProfileError(config.generalError));
    }
  }
}

export function* showNotificationSaga({
  level, title, message, placement, key
}) {
  yield call(() => {
    notification[level || 'error']({
      key: key || `${level}_${title}_${message}`,
      message: title || 'Error',
      description: message || config.generalError.unknownError[0],
      placement: placement || 'topRight'
    });
  });
}

export function* locationChangeSaga({ payload: { pathname } }) {
  const path = pathname.split('/');

  if (path[1] === 'delete' && path[3] === 'service') {
    yield delay();
    yield put(openDeleteModal(path[4], 'service'));
  } else if (path[1] === 'delete' && path[2]) {
    yield delay();
    yield put(openDeleteModal(path[2], 'case'));
  }
}

export function* notAuthenticatedSaga() {
  yield put(loginSuccess(noLoginDataAction));
}

export default function* appSaga() {
  yield takeLatest(LOGIN_START, loginStartSaga);
  yield takeLatest(LOGIN_SUCCESS, loginSuccessSaga);
  yield takeLatest(LOGOUT_START, logoutStartSaga);
  yield takeLatest(SHOW_NOTIFICATION, showNotificationSaga);
  yield takeLatest(UPDATE_PROFILE_START, updateProfileStartSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);
  yield takeLatest(NOT_AUTHENTICATED, notAuthenticatedSaga);

  yield call(loginCheckSaga);

  const locationAction = yield select((data) => ({ payload: { pathname: data.get('route').get('location').get('pathname') } }));
  yield call(() => locationChangeSaga(locationAction));
}
