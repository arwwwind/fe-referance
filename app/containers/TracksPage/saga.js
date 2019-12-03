import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from '../../axios';
import config from '../../config';
import * as type from '../CaseSinglePage/components/SaveService/types';

import {
  FETCH_TRACKS_START,
  MOVE_TRACKS_START,
  SINGLE_TRACKS_START,
  SAVE_TRACKS_START,
  DELETE_TRACKS_START
} from './constants';
import {
  singleTracksError,
  singleTracksData,
  fetchTracksStart,
  fetchTracksError,
  fetchTracksData,
  moveTracksError,
  saveTracksSuccess,
  saveTracksError,
  deleteTracksSuccess,
  deleteTracksError
} from './actions';
import { hideDrawer, showDrawer } from '../../components/Core/Drawer/actions';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';

/**
 * Fetch tracks
 * @function tracksFetch
 */
export function* tracksFetch() {
  try {
    const response = yield call(axios.get, 'tracks');
    const { data } = response.data;

    const transformedData = {};

    type.list.forEach((key) => {
      const tasks = {};
      const columns = {};

      data[key.value].tasks.forEach((el) => {
        tasks[el.id.toString()] = el;
      });

      Object.keys(data[key.value].phases).forEach((phase) => {
        columns[phase] = {
          id: phase.toLowerCase(),
          title: phase,
          taskIDs: data[key.value].phases[phase].map((el) => el.toString())
        };
      });

      transformedData[key.value] = { tasks, tasksLength: Object.keys(tasks).length, columns, boardTitle: key.label, columnOrder: ['review', 'progress', 'invoicing', 'hold', 'suspended'] };
    });

    yield put(fetchTracksData(transformedData));
  } catch (error) {
    try {
      yield put(fetchTracksError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchTracksError(config.generalError));
      yield put(showNotification());
    }
  }
}

/**
 * Add track
 * @function formTracksSend
 */
export function* formTracksSend({ data, form }) {
  try {
    const state = yield select();
    const id = state.get('tracks').get('id');
    const boardID = state.get('tracks').get('boardID');
    const newData = { ...data, serviceType: boardID, newPosition: 0, phase: 'review' };

    const response = yield call(id ? () => axios.put(`tracks/${id}`, newData) : () => axios.post('tracks', newData));
    const receivedData = response.data.data;

    form.resetFields();

    yield put(saveTracksSuccess(receivedData));
    yield put(hideDrawer('tracks'));
    yield put(fetchTracksStart());
  } catch (error) {
    try {
      yield put(saveTracksError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveTracksError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* formTracksMove({ data }) {
  try {
    const id = data.draggableId;
    const newPhase = data.droppableId;
    const newPosition = data.index;

    yield call(() => axios.post(`tracks/actions/${id}/move`, { newPhase, newPosition }));

    // yield put(fetchTracksStart());
  } catch (error) {
    try {
      yield put(moveTracksError(error.response.data.errors));
      errors.display(error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(moveTracksError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* formTracksStart({ id, boardID }) {
  yield put(showDrawer('tracks'));
  if (id && boardID) {
    try {
      const response = yield call(() => axios.get(`tracks/${id}`));
      const receivedData = response.data.data;


      yield put(singleTracksData(receivedData));
    } catch (error) {
      try {
        yield put(singleTracksError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleTracksError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(singleTracksData(null));
  }
}

/**
 * Delete tracks
 * @function deleteTracksSaga
 */
export function* deleteTracksSaga() {
  const state = yield select();
  const id = state.get('tracks').get('id');
  try {
    const response = yield call(() => axios.delete(`tracks/${id}`));
    const receivedData = response.data.data;

    yield put(deleteTracksSuccess(receivedData));
    yield put(hideDrawer('tracks'));
    yield put(fetchTracksStart());
  } catch (error) {
    try {
      yield put(deleteTracksError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', '),
        placement: 'topLeft'
      }));
    } catch (internal) {
      yield put(deleteTracksError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield takeLatest(FETCH_TRACKS_START, tracksFetch);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_TRACKS_START, formTracksSend);
  yield takeLatest(SINGLE_TRACKS_START, formTracksStart);
  yield takeLatest(MOVE_TRACKS_START, formTracksMove);
  yield takeLatest(DELETE_TRACKS_START, deleteTracksSaga);
}
