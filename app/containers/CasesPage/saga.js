import { select, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { delay } from 'redux-saga';
import moment from 'moment';
import axios from '../../axios';
import config from '../../config';

import {
  SEARCH_CASE_START,
  FETCH_CASE_START,
  SAVE_CASE_START,
  SINGLE_CASE_START,
  DELETE_CASE_START,
  FETCH_CASE_NEW_PAGE,
  QUICK_VIEW_CHANGE,
} from './constants';
import {
  resetCasesData,
  fetchCaseData,
  fetchCaseError,
  fetchCaseStart,
  saveCaseError,
  saveCaseSuccess,
  singleCaseData,
  singleCaseError,
  deleteCaseSuccess,
  deleteCaseError
} from './actions';
import { hideDrawer, showDrawer } from '../../components/Core/Drawer/actions';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';
import { DEFAULT_VIEW } from './components/QuickView';

const routeByEntity = (entity, entityId) => {
  if (entity && entityId) {
    return {
      index: `cases/lists/${entity}/${entityId}`,
      search: `cases/lists/${entity}/${entityId}`
    };
  }
  return {
    index: 'cases',
    search: 'search/cases'
  };
};

/**
 * Fetch cases
 * @function casesFetch
 */
export function* casesFetch({ entity, entityId }) {
  const route = routeByEntity(entity, entityId);
  const page = yield select((data) => data.get('cases').get('fetch').get('currentPage'));
  const searchValue = yield select((data) => data.get('cases').get('fetch').get('searchValue'));
  const quickView = yield select((data) => data.get('cases').get('fetch').get('quickView'));

  try {
    const response = yield call(() => axios.get(searchValue ? route.search : route.index, {
      params: {
        page,
        search: searchValue || undefined,
        quickView: (quickView === DEFAULT_VIEW) ? undefined : quickView
      }
    }));
    yield put(fetchCaseData(response.data.data));
  } catch (error) {
    try {
      yield put(fetchCaseError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchCaseError(config.generalError));
      yield put(showNotification());
    }
  }
}

/**
 * Add or edit a case
 * @function formCaseSend
 */
export function* formCaseSend({ data, form, id, addServices }) {
  try {
    const response = yield call(id ? () => axios.put(`cases/${id}`, data) : () => axios.post('cases', data));
    const receivedData = response.data.data;

    yield put(hideDrawer('cases'));
    if (!id) {
      yield put(resetCasesData());
    }
    yield put(fetchCaseStart());

    yield put(saveCaseSuccess(receivedData));

    if (addServices === 'no') {
      form.resetFields();
    } else {
      const resourceId = id ? id : yield select(data => data.get('cases').get('save').get('response').get('id'));
      yield put(push(`/case/${resourceId}/add-service`));
    }
  } catch (error) {
    try {
      yield put(saveCaseError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveCaseError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

/**
 * Delete cases
 * @function singleCaseStart
 */
export function* singleCaseStart({ id }) {
  yield put(showDrawer('cases'));

  if (id) {
    try {
      const response = yield call(() => axios.get(`cases/${id}`));
      const receivedData = response.data.data;

      if (receivedData.claims) {
        receivedData.claims = receivedData.claims.map((claim) => {
          claim.dateOfInjuryStart = moment(claim.dateOfInjuryStart);
          claim.dateOfInjuryEnd = moment(claim.dateOfInjuryEnd);

          return claim;
        }).sort((a, b) => b.id - a.id);
      }

      yield put(singleCaseData(receivedData));
    } catch (error) {
      try {
        yield put(singleCaseError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleCaseError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(singleCaseData(null));
  }
}

/**
 * Delete cases
 * @function casesFetch
 */
export function* deleteCasesSaga({ id }) {
  try {
    const response = yield call(() => axios.delete(`cases/${id}`));
    const receivedData = response.data.data;

    yield put(deleteCaseSuccess(receivedData));
    yield put(fetchCaseStart());
  } catch (error) {
    try {
      yield put(deleteCaseError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteCaseError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield takeLatest(FETCH_CASE_START, casesFetch);
  yield takeLatest(SEARCH_CASE_START, casesFetch);
  yield takeLatest(FETCH_CASE_NEW_PAGE, casesFetch);
  yield takeLatest(QUICK_VIEW_CHANGE, casesFetch);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_CASE_START, formCaseSend);
  yield takeLatest(SINGLE_CASE_START, singleCaseStart);
  yield takeLatest(DELETE_CASE_START, deleteCasesSaga);
}
