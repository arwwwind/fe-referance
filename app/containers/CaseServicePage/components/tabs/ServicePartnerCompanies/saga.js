import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../axios';
import config from '../../../../../config';
import {
  SEARCH_PARTNER_COMPANY_START,
  FETCH_PARTNER_COMPANY_START,
  SAVE_PARTNER_COMPANY_START,
  SINGLE_PARTNER_COMPANY_START,
  DELETE_PARTNER_COMPANY_START,
  FETCH_PARTNER_COMPANY_NEW_PAGE
} from './constants';
import {
  fetchPartnerCompanyData,
  fetchPartnerCompanyError,
  fetchPartnerCompanyStart,
  savePartnerCompanyError,
  savePartnerCompanySuccess,
  singlePartnerCompanyData,
  singlePartnerCompanyError,
  deletePartnerCompanySuccess,
  deletePartnerCompanyError,
  searchPartnerCompanyStart,
  fetchPartnerCompanyNewPage,
} from './actions';
import { getServiceId, getCaseId } from '../../../../../utils/router';
import { hideDrawer, showDrawer } from '../../../../../components/Core/Drawer/actions';
import * as errors from '../../../../../utils/errors';
import { showNotification } from '../../../../App/actions';

/**
 * Fetch partnerCompanies
 * @function partnerCompaniesFetch
 */
export function* partnerCompaniesFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const page = yield select((data) => data.get('partnerCompanies').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('partnerCompanies').get('search').get('searchValue'));

    const response = yield call(() => axios.get(searchValue ? `/search/partner-companies?serviceId=${getServiceId(path)}` : `/search/partner-companies?serviceId=${getServiceId(path)}`, {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;

    yield put(fetchPartnerCompanyData(data));
  } catch (error) {
    try {
      yield put(fetchPartnerCompanyError(error.response.data.errors));
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchPartnerCompanyError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* partnerCompaniesResetAndFetch() {
  yield put(fetchPartnerCompanyNewPage(1));
}

/**
 * Add partnerCompanies
 * @function partnerCompaniesFetch
 */
export function* formPartnerCompanySend({ data, form }) {
  try {
    const path = yield select((pathData) => pathData.get('route').get('location').get('pathname'));
    const state = yield select();
    const id = state.get('partnerCompanies').get('id');

    const response = yield call(id ? () => axios.put(`cases/${getCaseId(path)}/services/${getServiceId(path)}/partner-companies/${id}`, data) : () => axios.post(`cases/${getCaseId(path)}/services/${getServiceId(path)}/partner-companies`, data));
    const receivedData = response.data.data;

    form.resetFields();

    yield put(savePartnerCompanySuccess(receivedData));
    yield put(hideDrawer('partnerCompanies'));
    yield put(fetchPartnerCompanyStart());
  } catch (error) {
    try {
      yield put(savePartnerCompanyError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(savePartnerCompanyError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singlePartnerCompanyStart({ id }) {
  yield put(showDrawer('partnerCompanies'));
  const path = yield select((data) => data.get('route').get('location').get('pathname'));
  if (id) {
    try {
      const response = yield call(() => axios.get(`cases/${getCaseId(path)}/services/${getServiceId(path)}/partner-companies/${id}`));
      const receivedData = response.data.data;

      yield put(singlePartnerCompanyData(receivedData));
    } catch (error) {
      try {
        yield put(singlePartnerCompanyError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singlePartnerCompanyError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  }
}

/**
 * Delete partnerCompanies
 * @function partnerCompaniesFetch
 */
export function* deletePartnerCompaniesSaga({ id }) {
  try {
    const path = yield select((pathData) => pathData.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.delete(`cases/${getCaseId(path)}/services/${getServiceId(path)}/partner-companies/${id}`));
    const receivedData = response.data.data;

    yield put(deletePartnerCompanySuccess(receivedData));
    yield put(fetchPartnerCompanyStart());
  } catch (error) {
    try {
      yield put(deletePartnerCompanyError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deletePartnerCompanyError(config.generalError));
      yield put(showNotification());
    }
  }
}
export function* pageSaga() {
  yield put(searchPartnerCompanyStart(null));

  yield takeLatest(SEARCH_PARTNER_COMPANY_START, partnerCompaniesResetAndFetch);
  yield takeLatest(FETCH_PARTNER_COMPANY_START, partnerCompaniesResetAndFetch);
  yield takeLatest(FETCH_PARTNER_COMPANY_NEW_PAGE, partnerCompaniesFetch);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_PARTNER_COMPANY_START, formPartnerCompanySend);
  yield takeLatest(SINGLE_PARTNER_COMPANY_START, singlePartnerCompanyStart);
  yield takeLatest(DELETE_PARTNER_COMPANY_START, deletePartnerCompaniesSaga);
}
