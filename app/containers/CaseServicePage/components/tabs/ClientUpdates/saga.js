import { select, call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../axios';
import config from '../../../../../config';

import {
  SEARCH_CLIENT_UPDATE_START,
  FETCH_CLIENT_UPDATE_START,
  FETCH_CLIENT_UPDATE_NEW_PAGE,
  SAVE_CLIENT_UPDATE_START,
} from './constants';
import {
  fetchClientUpdateStart,
  fetchClientUpdateData,
  fetchClientUpdateError,
  saveClientUpdateError,
  saveClientUpdateSuccess,
} from './actions';
import { showNotification } from '../../../../App/actions';
import * as errors from '../../../../../utils/errors';
import { closeWindow } from '../../../../WindowSystem/actions';
import { statusClientUpdatesStart } from './components/RedDotClientUpdates/actions';

/**
 * Fetch client updates
 * @function liensFetch
 */
export function* liensFetch({ caseId, serviceId }) {
  const page = yield select((data) => data.get('clientUpdates').get('fetch').get('currentPage'));
  const searchValue = yield select((data) => data.get('clientUpdates').get('fetch').get('searchValue'));

  try {
    const response = yield call(() => axios.get(searchValue ? 'search/client-updates' : `cases/${caseId}/services/${serviceId}/client-updates`, {
      params: {
        page,
        search: searchValue || undefined,
        serviceId: searchValue ? serviceId : undefined,
        caseId: searchValue ? caseId : undefined
      }
    }));
    yield put(fetchClientUpdateData(caseId, serviceId, response.data.data));
  } catch (error) {
    try {
      yield put(fetchClientUpdateError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchClientUpdateError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* saveClientUpdate({ caseId, serviceId, data, form }) {
  try {
    const response = yield call(() => axios.post(`cases/${caseId}/services/${serviceId}/client-updates`, data));
    const receivedData = response.data.data;

    yield put(closeWindow(`serviceSaveClientUpdates${serviceId}-add`));
    yield put(fetchClientUpdateStart(caseId, serviceId));
    yield put(statusClientUpdatesStart(caseId, serviceId));
    yield put(saveClientUpdateSuccess(caseId, serviceId, receivedData));
  } catch (error) {
    try {
      yield put(saveClientUpdateError(caseId, serviceId, error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveClientUpdateError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* pageSaga() {
  yield takeLatest(FETCH_CLIENT_UPDATE_START, liensFetch);
  yield takeLatest(SEARCH_CLIENT_UPDATE_START, liensFetch);
  yield takeLatest(FETCH_CLIENT_UPDATE_NEW_PAGE, liensFetch);

  yield takeLatest(SAVE_CLIENT_UPDATE_START, saveClientUpdate);
}
