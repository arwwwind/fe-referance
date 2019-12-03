import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../axios';
import config from '../../../config';
import {
  FETCH_TASK_START,
  FETCH_TASK_NEW_PAGE,
} from './constants';
import {
  fetchTaskData,
  fetchTaskError,
  fetchTaskNewPage,
  fetchTaskStart
} from './actions';
import { showNotification } from '../../App/actions';
import { CHANGE_FILTER_VALUE } from '../ServiceFilter/constants';
import { getCaseId } from '../../../utils/router';

/**
 * Fetch tasks
 * @function tasksFetch
 */
export function* tasksFetch() {
  try {
    const caseId = yield select((state) => getCaseId(state.get('route').get('location').get('pathname')));
    const page = yield select((data) => data.get('tasks').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('tasks').get('search').get('searchValue'));
    const serviceType = yield select((data) => data.get('tasks').get('fetch').get('serviceType'));

    const response = yield call(() => axios.get(searchValue ? 'search/tasks' : 'case-tasks', {
      params: {
        page,
        search: searchValue || undefined,
        serviceType: (serviceType === 'all') ? undefined : serviceType,
        caseId
      }
    }));
    const { data } = response.data;

    yield put(fetchTaskData(data));
  } catch (error) {
    try {
      yield put(fetchTaskError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchTaskError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* tasksResetAndFetch() {
  yield put(fetchTaskNewPage(1));
}

export function* changeFilterValue() {
  yield put(fetchTaskStart());
}

export default function* saga() {
  yield takeLatest(FETCH_TASK_START, tasksResetAndFetch);
  yield takeLatest(FETCH_TASK_NEW_PAGE, tasksFetch);
  yield takeLatest(CHANGE_FILTER_VALUE, changeFilterValue);
}
