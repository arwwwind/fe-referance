import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from '../../axios';
import config from '../../config';
import {
  SEARCH_ORGANIZATION_START,
  FETCH_ORGANIZATION_START,
  SAVE_ORGANIZATION_START,
  SINGLE_ORGANIZATION_START,
  DELETE_ORGANIZATION_START,
  FETCH_ORGANIZATION_NEW_PAGE
} from './constants';
import {
  fetchOrganizationData,
  fetchOrganizationError,
  fetchOrganizationStart,
  saveOrganizationError,
  saveOrganizationSuccess,
  singleOrganizationData,
  singleOrganizationError,
  deleteOrganizationSuccess,
  deleteOrganizationError,
  searchOrganizationStart,
  fetchOrganizationNewPage,
  organizationFormTypeChange
} from './actions';
import { fetchSingleOrganizationStart } from '../OrganizationSinglePage/actions';
import { hideDrawer, showDrawer } from '../../components/Core/Drawer/actions';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';
import { fetchServiceStart } from '../CaseServicePage/actions';

/**
 * Fetch organizations
 * @function organizationsFetch
 */
export function* organizationsFetch() {
  try {
    const page = yield select((data) => data.get('organizations').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('organizations').get('search').get('searchValue'));

    const response = yield call(() => axios.get(searchValue ? 'search/organisations' : 'organisations', {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;

    yield put(fetchOrganizationData(data));
  } catch (error) {
    try {
      yield put(fetchOrganizationError(error.response.data.errors));
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchOrganizationError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* organizationsResetAndFetch() {
  yield put(fetchOrganizationNewPage(1));
}

/**
 * Add organizations
 * @function organizationsFetch
 */
export function* formOrganizationSend({ data, form }) {
  try {
    const state = yield select();
    const id = state.get('organizations').get('id');

    const response = yield call(id ? () => axios.put(`organisations/${id}`, data) : () => axios.post('organisations', data));
    const receivedData = response.data.data;

    // get service
    yield put(fetchServiceStart());

    form.resetFields();

    yield put(saveOrganizationSuccess(receivedData));
    yield put(hideDrawer('organizations'));
    yield put(fetchOrganizationStart());
    yield put(fetchSingleOrganizationStart(id));
  } catch (error) {
    try {
      yield put(saveOrganizationError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveOrganizationError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleOrganizationStart({ id }) {
  yield put(showDrawer('organizations'));

  if (id) {
    try {
      const response = yield call(() => axios.get(`organisations/${id}`));
      const receivedData = response.data.data;
      yield put(organizationFormTypeChange(receivedData.type ? receivedData.type : undefined));
      yield put(singleOrganizationData(receivedData));
    } catch (error) {
      try {
        yield put(singleOrganizationError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleOrganizationError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(organizationFormTypeChange(undefined));
    yield put(singleOrganizationData(null));
  }
}

/**
 * Delete organizations
 * @function organizationsFetch
 */
export function* deleteOrganizationsSaga({ id }) {
  try {
    const response = yield call(() => axios.delete(`organisations/${id}`));
    const receivedData = response.data.data;

    yield put(deleteOrganizationSuccess(receivedData));
    yield put(fetchOrganizationStart());
  } catch (error) {
    try {
      yield put(deleteOrganizationError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteOrganizationError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield put(searchOrganizationStart(null));

  yield takeLatest(SEARCH_ORGANIZATION_START, organizationsResetAndFetch);
  yield takeLatest(FETCH_ORGANIZATION_START, organizationsResetAndFetch);
  yield takeLatest(FETCH_ORGANIZATION_NEW_PAGE, organizationsFetch);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_ORGANIZATION_START, formOrganizationSend);
  yield takeLatest(SINGLE_ORGANIZATION_START, singleOrganizationStart);
  yield takeLatest(DELETE_ORGANIZATION_START, deleteOrganizationsSaga);
}
