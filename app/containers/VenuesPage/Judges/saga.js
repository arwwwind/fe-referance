import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../axios';
import config from '../../../config';
import {
  SEARCH_JUDGE_START,
  FETCH_JUDGE_START,
  SAVE_JUDGE_START,
  SINGLE_JUDGE_START,
  DELETE_JUDGE_START,
  FETCH_JUDGE_NEW_PAGE
} from './constants';
import {
  fetchJudgeData,
  fetchJudgeError,
  fetchJudgeStart,
  saveJudgeError,
  saveJudgeSuccess,
  singleJudgeData,
  singleJudgeError,
  deleteJudgeSuccess,
  deleteJudgeError,
  searchJudgeStart,
  fetchJudgeNewPage,
} from './actions';
import { fetchSingleJudgeStart } from '../../JudgeSinglePage/actions';
import { hideDrawer, showDrawer } from '../../../components/Core/Drawer/actions';
import * as errors from '../../../utils/errors';
import { showNotification } from '../../App/actions';

/**
 * Fetch judges
 * @function judgesFetch
 */
export function* judgesFetch() {
  try {
    const page = yield select((data) => data.get('judges').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('judges').get('search').get('searchValue'));

    const response = yield call(() => axios.get(searchValue ? 'search/judges' : 'judges', {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;

    yield put(fetchJudgeData(data));
  } catch (error) {
    try {
      yield put(fetchJudgeError(error.response.data.errors));
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchJudgeError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* judgesResetAndFetch() {
  yield put(fetchJudgeNewPage(1));
}

/**
 * Add judges
 * @function judgesFetch
 */
export function* formJudgeSend({ data, form }) {
  try {
    const state = yield select();
    const id = state.get('judges').get('id');

    const response = yield call(id ? () => axios.put(`judges/${id}`, data) : () => axios.post('judges', data));
    const receivedData = response.data.data;

    form.resetFields();

    yield put(saveJudgeSuccess(receivedData));
    yield put(hideDrawer('judges'));
    yield put(fetchJudgeStart());
    yield put(fetchSingleJudgeStart());
  } catch (error) {
    try {
      yield put(saveJudgeError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveJudgeError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleJudgeStart({ id }) {
  yield put(showDrawer('judges'));

  if (id) {
    try {
      const response = yield call(() => axios.get(`judges/${id}`));
      const receivedData = response.data.data;

      yield put(singleJudgeData(receivedData));
    } catch (error) {
      try {
        yield put(singleJudgeError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleJudgeError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  }
}

/**
 * Delete judges
 * @function judgesFetch
 */
export function* deleteJudgesSaga({ id }) {
  try {
    const response = yield call(() => axios.delete(`judges/${id}`));
    const receivedData = response.data.data;

    yield put(deleteJudgeSuccess(receivedData));
    yield put(fetchJudgeStart());
  } catch (error) {
    try {
      yield put(deleteJudgeError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteJudgeError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield put(searchJudgeStart(null));

  yield takeLatest(SEARCH_JUDGE_START, judgesResetAndFetch);
  yield takeLatest(FETCH_JUDGE_START, judgesResetAndFetch);
  yield takeLatest(FETCH_JUDGE_NEW_PAGE, judgesFetch);

  yield put(fetchJudgeStart());
}

export function* drawerSaga() {
  yield takeLatest(SAVE_JUDGE_START, formJudgeSend);
  yield takeLatest(SINGLE_JUDGE_START, singleJudgeStart);
  yield takeLatest(DELETE_JUDGE_START, deleteJudgesSaga);
}
