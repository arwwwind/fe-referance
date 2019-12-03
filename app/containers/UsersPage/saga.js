import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import config from '../../config';
import { SEARCH_USER_START, FETCH_USER_START, SAVE_USER_START, SINGLE_USER_START, DELETE_USER_START, SWITCH_USER_STATUS_START } from './constants';
import {
  searchUserResults,
  searchUserError,
  fetchUserData,
  fetchUserError,
  fetchUserStart,
  saveUserError,
  saveUserSuccess,
  singleUserData,
  singleUserError,
  deleteUserSuccess,
  deleteUserError,
  searchUserStart,
  switchUserStatusSuccess,
  switchUserStatusError
} from './actions';
import { getName } from './columns';
import { hideDrawer, showDrawer } from '../../components/Core/Drawer/actions';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';

/**
 * Search users
 * @function usersSearch
 */
export function* usersSearch(action) {
  const users = yield select((state) => state.get('users'));

  try {
    yield put(searchUserResults(users.get('data').filter((user) => {
      const search = action.value.toLowerCase();
      const name = getName(user.toJS());

      return name.toLowerCase().indexOf(search) !== -1 || user.get('loginEmail').toLowerCase().indexOf(search) !== -1;
    })));
  } catch (err) {
    yield put(searchUserError(config.generalError));
    yield put(showNotification());
  }
}

/**
 * Fetch users
 * @function usersFetch
 */
export function* usersFetch() {
  try {
    const response = yield call(() => axios.get('users'));
    const { data } = response.data;

    yield put(fetchUserData(data));

    const searchValue = (yield select()).get('users').get('search').get('searchValue');
    if (searchValue) {
      yield put(searchUserStart(searchValue));
    }
  } catch (error) {
    try {
      yield put(fetchUserError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchUserError(config.generalError));
      yield put(showNotification());
    }
  }
}

/**
 * Add users
 * @function usersFetch
 */
export function* formUserSend({ data, form }) {
  try {
    const state = yield select();
    const id = state.get('users').get('id');

    const response = yield call(id ? () => axios.put(`users/${id}`, data) : () => axios.post('users', data));
    const receivedData = response.data.data;

    form.resetFields();

    yield put(saveUserSuccess(receivedData));
    yield put(hideDrawer('users'));
    yield put(fetchUserStart());
  } catch (error) {
    try {
      yield put(saveUserError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveUserError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleUserStart({ id }) {
  yield put(showDrawer('users'));

  if(id) {
    try {
      const response = yield call(() => axios.get(`users/${id}`));
      const receivedData = response.data.data;

      yield put(singleUserData(receivedData));
    } catch (error) {
      try {
        yield put(singleUserError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleUserError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  }
}

/**
 * Delete users
 * @function usersFetch
 */
export function* deleteUsersSaga({ id }) {
  try {
    const response = yield call(() => axios.delete(`users/${id}`));
    const receivedData = response.data.data;

    yield put(deleteUserSuccess(receivedData));
    yield put(fetchUserStart());
  } catch (error) {
    try {
      yield put(deleteUserError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteUserError(config.generalError));
      yield put(showNotification());
    }
  }
}

/**
 * Switch User Status
 * @function switchUserStatusSaga
 */
export function* switchUserStatusSaga({ id, status }) {
  try {
    yield call(() => axios.patch(`users/${id}`, { active: `${!status}` }));
    yield put(switchUserStatusSuccess());
    yield put(fetchUserStart());
  } catch (error) {
    try {
      yield put(switchUserStatusError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(switchUserStatusError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield takeLatest(SEARCH_USER_START, usersSearch);
  yield takeLatest(FETCH_USER_START, usersFetch);
}

export function* drawerSaga() {
  yield takeLatest(SINGLE_USER_START, singleUserStart);
  yield takeLatest(SAVE_USER_START, formUserSend);
  yield takeLatest(DELETE_USER_START, deleteUsersSaga);
  yield takeLatest(SWITCH_USER_STATUS_START, switchUserStatusSaga);
}
