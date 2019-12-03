import { call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { delay } from 'redux-saga';
import axios from '../../../axios';
import config from '../../../config';
import {
  SAVE_TASK_START,
  SINGLE_TASK_START,
} from './constants';
import {
  fetchTaskStart
} from '../ListPerCase/actions';
import {
  saveTaskError,
  saveTaskSuccess,
  singleTaskData,
  singleTaskError,
} from './actions';
import { hideDrawer, showDrawer } from '../../../components/Core/Drawer/actions';
import * as errors from '../../../utils/errors';
import { showNotification } from '../../App/actions';
import { fetchFilteredTaskStart } from '../ListMyOwn/actions';

/**
 * Add tasks
 * @function tasksFetch
 */
export function* formTaskSend({ data, form }) {
  try {
    const state = yield select();
    const id = state.get('tasks').get('id');
    const [empty, page, caseId] = state.get('route').get('location').get('pathname').split('/');

    const response = yield call(id ? () => axios.put(`tasks/${id}`, data) : () => axios.post('tasks', { ...data, caseId: (page === 'case') ? caseId : undefined}));
    const receivedData = response.data.data;

    form.resetFields();

    yield put(saveTaskSuccess(receivedData));
    yield put(hideDrawer('tasks'));
    yield put(fetchTaskStart());
    const filters = ['overdue', 'today', 'next-7-days'];
    for (let i = 0; i < filters.length; i += 1) {
      yield put(fetchFilteredTaskStart(filters[i]));
    }
  } catch (error) {
    try {
      yield put(saveTaskError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveTaskError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleTaskStart({ id }) {
  yield put(showDrawer('tasks'));

  if (id) {
    try {
      const response = yield call(() => axios.get(`tasks/${id}`));
      const receivedData = response.data.data;

      if(receivedData.claims) {
        receivedData.claims = receivedData.claims.map(claim => {
          claim.dateOfInjuryStart = moment(claim.dateOfInjuryStart);
          claim.dateOfInjuryEnd = moment(claim.dateOfInjuryEnd);

          return claim;
        });
      }

      yield put(singleTaskData(receivedData));
    } catch (error) {
      try {
        yield put(singleTaskError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleTaskError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(singleTaskData(null));
  }
}

export function* drawerSaga() {
  yield takeLatest(SAVE_TASK_START, formTaskSend);
  yield takeLatest(SINGLE_TASK_START, singleTaskStart);
}
