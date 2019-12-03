import { call, put, select, takeEvery } from 'redux-saga/effects';
import axios from '../../../axios';
import config from '../../../config';
import {
  FETCH_FILTERED_TASK_START,
  FETCH_FILTERED_TASK_NEW_PAGE,
} from './constants';
import {
  fetchFilteredTaskData,
  fetchFilteredTaskError,
  fetchFilteredTaskNewPage
} from './actions';
import { showNotification } from '../../App/actions';

/**
 * Fetch tasks
 * @function tasksFetch
 */
export function* tasksFetch({ filter }) {
  try {
    const page = yield select((data) => data.get('tasks').get('fetchMyOwn').get(filter).get('currentPage'));

    const response = yield call(() => axios.get('my-tasks', {
      params: {
        page,
        filter
      }
    }));
    const { data } = response.data;

    yield put(fetchFilteredTaskData(filter, data));
  } catch (error) {
    try {
      yield put(fetchFilteredTaskError(filter, error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchFilteredTaskError(filter, config.generalError));
      yield put(showNotification());
    }
  }
}

export function* tasksResetAndFetch({ filter }) {
  yield put(fetchFilteredTaskNewPage(filter, 1));
}

export default function* saga() {
  yield takeEvery(FETCH_FILTERED_TASK_START, tasksResetAndFetch);
  yield takeEvery(FETCH_FILTERED_TASK_NEW_PAGE, tasksFetch);
}
