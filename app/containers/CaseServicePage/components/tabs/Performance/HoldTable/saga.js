import { select, call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../../axios';
import config from '../../../../../../config';

import {
  SEARCH_HOLD_SERVICE_START,
  FETCH_HOLD_SERVICE_START,
  FETCH_HOLD_SERVICE_NEW_PAGE,
} from './constants';
import {
  fetchHoldServiceData,
  fetchHoldServiceError,
} from './actions';
import { showNotification } from '../../../../../App/actions';

const routeByEntity = (caseId, serviceId, entity, entityId) => {
  if (entity && entityId) {
    return {
      index: `cases/${caseId}/services/${serviceId}/client-updates/lists/${entity}/${entityId}`,
      search: `cases/${caseId}/services/${serviceId}/search/client-updates/lists/${entity}/${entityId}`
    };
  }
  return {
    index: `services/actions/${serviceId}/hold`,
    search: `search/services/actions/${serviceId}/hold`
  };
};

/**
 * Fetch service holds
 * @function holdsFetch
 */
export function* holdsFetch({ caseId, serviceId, entity, entityId }) {
  const route = routeByEntity(caseId, serviceId, entity, entityId);
  const page = yield select((data) => data.get('holdServices').get('fetch').get('currentPage'));
  const searchValue = yield select((data) => data.get('holdServices').get('fetch').get('searchValue'));

  try {
    const response = yield call(() => axios.get(searchValue ? route.search : route.index, {
      params: {
        page,
        search: searchValue || undefined,
        serviceId: searchValue ? serviceId : undefined,
        caseId: searchValue ? caseId : undefined
      }
    }));
    yield put(fetchHoldServiceData(response.data.data));
  } catch (error) {
    try {
      yield put(fetchHoldServiceError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchHoldServiceError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield takeLatest(FETCH_HOLD_SERVICE_START, holdsFetch);
  yield takeLatest(SEARCH_HOLD_SERVICE_START, holdsFetch);
  yield takeLatest(FETCH_HOLD_SERVICE_NEW_PAGE, holdsFetch);
}
