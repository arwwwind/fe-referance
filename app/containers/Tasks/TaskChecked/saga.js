import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';
import config from '../../../config';
import { TASK_CHECKED_START } from './constants';
import { showNotification } from '../../App/actions';
import { taskCheckedSuccess, taskCheckedError } from './actions';
import { taskChecked } from '../actions';

/**
 * Fetch statistics
 * @function startTaskCheck
 */
export function* startTaskCheck({ id, checked }) {
  try {
    yield put(taskChecked({
      id,
      endedOn: checked ? null : moment().utc().format('YYYY-MM-DD HH:mm:ssZZ')
    }));

    if(checked) {
      yield call(() => axios.post(`/incomplete-tasks/${id}`));
    } else {
      yield call(() => axios.post(`/complete-tasks/${id}`));
    }

    yield put(taskCheckedSuccess());
  } catch (error) {
    try {
      yield put(taskCheckedError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(taskCheckedError(config.generalError));
      yield put(showNotification());
    }

    yield put(taskChecked({
      id,
      endedOn: null
    }));
  }
}


export default function* saga() {
  yield takeLatest(TASK_CHECKED_START, startTaskCheck);
}
