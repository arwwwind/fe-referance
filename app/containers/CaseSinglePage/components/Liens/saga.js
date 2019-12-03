import { select, call, put, takeLatest } from 'redux-saga/effects';
import merge from 'lodash/merge';
import { push } from 'react-router-redux';
import { delay } from 'redux-saga';
import moment from 'moment';
import axios from '../../../../axios';
import config from '../../../../config';
import {
  SEARCH_LIEN_START,
  FETCH_LIEN_START,
  SAVE_LIEN_START,
  SINGLE_LIEN_START,
  DELETE_LIEN_START,
  FETCH_LIEN_NEW_PAGE,
  STATISTICS_LIEN_START
} from './constants';
import {
  resetLiensData,
  fetchLienData,
  fetchLienError,
  fetchLienStart,
  saveLienError,
  saveLienSuccess,
  singleLienData,
  singleLienError,
  deleteLienSuccess,
  deleteLienError,
  statisticsLienSuccess,
  statisticsLienError
} from './actions';
import { hideDrawer, showDrawer } from '../../../../components/Core/Drawer/actions';
import * as errors from '../../../../utils/errors';
import { showNotification } from '../../../App/actions';
import { stepIsActive } from '../SaveService/saga';

const routeByEntity = (entity, entityId) => {
  if (entity && entityId) {
    return {
      index: `liens/lists/${entity}/${entityId}`,
      search: `search/liens/lists/${entity}/${entityId}`
    };
  }
  return {
    index: 'liens',
    search: 'search/liens'
  };
};

const prepareDataToSend = (data, serviceId) => ({
  ...Object.keys(data).reduce((ret, step) => {
    if (stepIsActive(step, data)) {
      merge(ret, data[step]);
    }

    return ret;
  }, {}),
  serviceId
});

/**
 * Fetch liens
 * @function liensFetch
 */
export function* liensFetch({ entity, entityId, serviceId }) {
  const route = routeByEntity(entity, entityId);
  const page = yield select((data) => data.get('liens').get('fetch').get('currentPage'));
  const searchValue = yield select((data) => data.get('liens').get('fetch').get('searchValue'));

  try {
    const response = yield call(() => axios.get(searchValue ? route.search : route.index, {
      params: {
        page,
        search: searchValue || undefined,
        serviceId
      }
    }));
    yield put(fetchLienData(response.data.data));
  } catch (error) {
    try {
      yield put(fetchLienError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchLienError(config.generalError));
      yield put(showNotification());
    }
  }
}

/**
 * Add or edit a lien
 * @function formLienSend
 */
export function* formLienSend({ data, form, serviceId }) {
  try {
    const id = yield select((data) => data.get('liens').get('id'));
    const response = yield call(id ? () => axios.put(`liens/${id}`, prepareDataToSend(data, serviceId)) : () => axios.post('liens', prepareDataToSend(data, serviceId)));
    const receivedData = response.data.data;

    yield put(hideDrawer('liens'));
    if (!id) {
      yield put(resetLiensData());
    }
    yield put(fetchLienStart(serviceId));

    yield put(saveLienSuccess(receivedData));
  } catch (error) {
    try {
      yield put(saveLienError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveLienError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

/**
 * Delete liens
 * @function singleLienStart
 */
export function* singleLienStart({ id }) {
  yield put(showDrawer('liens'));

  if (id) {
    try {
      const response = yield call(() => axios.get(`liens/${id}`));
      const receivedData = response.data.data;

      receivedData.fillingDate = receivedData.fillingDate ? moment(receivedData.fillingDate) : undefined;
      receivedData.startDate = receivedData.startDate ? moment(receivedData.startDate) : undefined;
      receivedData.dateOfServiceStart = receivedData.startDate ? moment(receivedData.startDate) : undefined;
      receivedData.dateOfServiceEnd = receivedData.startDate ? moment(receivedData.startDate) : undefined;
      receivedData.flagged = receivedData.flagged ? 'true' : 'false';

      yield put(singleLienData(receivedData));
    } catch (error) {
      try {
        yield put(singleLienError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleLienError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(singleLienData(null));
  }
}

/**
 * Delete liens
 * @function liensFetch
 */
export function* deleteLiensSaga({ id, serviceId }) {
  try {
    const response = yield call(() => axios.delete(`liens/${id}`));
    const receivedData = response.data.data;

    yield put(deleteLienSuccess(receivedData));
    yield put(fetchLienStart(serviceId));
  } catch (error) {
    try {
      yield put(deleteLienError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteLienError(config.generalError));
      yield put(showNotification());
    }
  }
}


/**
 * Get liens statistics
 * @function statisticsLiensStartSaga
 */
export function* statisticsLiensStartSaga({ id }) {
  try {
    const response = yield call(() => axios.get(`metrics/lien/${id}/overview`));
    const receivedData = response.data.data;

    yield put(statisticsLienSuccess(receivedData));
  } catch (error) {
    try {
      yield put(statisticsLienError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(statisticsLienError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield takeLatest(FETCH_LIEN_START, liensFetch);
  yield takeLatest(SEARCH_LIEN_START, liensFetch);
  yield takeLatest(FETCH_LIEN_NEW_PAGE, liensFetch);
  yield takeLatest(STATISTICS_LIEN_START, statisticsLiensStartSaga);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_LIEN_START, formLienSend);
  yield takeLatest(SINGLE_LIEN_START, singleLienStart);
  yield takeLatest(DELETE_LIEN_START, deleteLiensSaga);
}
