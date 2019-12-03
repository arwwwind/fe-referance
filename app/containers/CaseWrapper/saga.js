import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from '../../axios';
import {
  FETCH_CASE_DETAILS_START,
  CASE_REQUEST_DELETE,
  CASE_DELETE_START,
  SERVICE_DELETE_START,
  SERVICE_REQUEST_DELETE,
  REQUEST_DELETE_CLOSE_MODAL,
  SERVICE_REASON_START,
  SERVICE_RESTORE_START
} from './constants';
import {
  fetchCaseDetailsError,
  fetchCaseDetailsData,
  caseDeleteError,
  caseDeleteSuccess,
  serviceDeleteError,
  serviceDeleteSuccess,
  fetchCaseDetailsStart,
  serviceReasonSuccess,
  serviceReasonError
} from './actions';
import { fetchServiceStart } from '../CaseServicePage/actions';
import config from '../../config';
import { getCaseId } from '../../utils/router';
import { showNotification, hideDropdown } from '../App/actions';
import * as errors from '../../utils/errors';
import { hideDrawer } from '../../components/Core/Drawer/actions';

export function* caseDetailsFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`cases/${getCaseId(path)}`));
    const { data } = response.data;
    yield put(fetchCaseDetailsData(data));
  } catch (error) {
    try {
      yield put(fetchCaseDetailsError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchCaseDetailsError(config.generalError));
    }
  }
}

export function* caseRequestDelete({ id }) {
  yield put(hideDropdown());
  try {
    yield call(() => axios.post(`/cases/actions/${id}/delete`));
    yield put(showNotification({
      key: 'case_request_delete_success',
      level: 'success',
      title: 'Request Delete',
      message: 'Your request has been successfully sent'
    }));
  } catch (error) {
    try {
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          key: 'case_request_delete_error',
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(showNotification());
    }
  }
}

export function* serviceRequestDelete({ id }) {
  yield put(hideDropdown());
  try {
    yield call(() => axios.post(`/services/actions/${id}/delete`));
    yield put(showNotification({
      key: 'service_request_delete_success',
      level: 'success',
      title: 'Request Delete',
      message: 'Your request has been successfully sent'
    }));
  } catch (error) {
    try {
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          key: 'service_request_delete_error',
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(showNotification());
    }
  }
}

export function* caseDeleteStart({ id }) {
  try {
    yield call(() => axios.delete(`/cases/actions/${id}`));
    yield put(caseDeleteSuccess());
    yield put(push('/cases'));
    yield put(showNotification({
      key: 'case_delete_success',
      level: 'success',
      title: 'Case Delete',
      message: 'The case has been successfully deleted'
    }));
  } catch (error) {
    try {
      yield put(caseDeleteError(error.response.data.errors));
    } catch (internal) {
      yield put(caseDeleteError(config.generalError));
    }
  }
}

export function* serviceDeleteStart({ id, caseId }) {
  try {
    yield call(() => axios.delete(`/services/actions/${id}`));
    yield put(serviceDeleteSuccess());
    yield put(push(`/case/${caseId}`));
    yield put(fetchCaseDetailsStart());
    yield put(showNotification({
      key: 'service_delete_success',
      level: 'success',
      title: 'Case Delete',
      message: 'The service has been successfully deleted'
    }));
  } catch (error) {
    try {
      yield put(serviceDeleteError(error.response.data.errors));
    } catch (internal) {
      yield put(serviceDeleteError(config.generalError));
    }
  }
}

export function* handleCloseDeleteModal({ ids }) {
  if (ids.caseId && ids.serviceId) {
    yield put(push(`/case/${ids.caseId}/service/${ids.serviceId}`));
  } else {
    yield put(push(`/case/${ids.caseId}`));
  }
}

export function* serviceReasonStart({ id, reasonType, data, form }) {
  try {
    yield call(() => axios.post(`/services/actions/${id}/${reasonType}`, data));
    yield put(serviceReasonSuccess());
    yield put(fetchServiceStart());
    form.resetFields();
    yield put(hideDrawer('serviceReasonDrawer'));
  } catch (error) {
    try {
      yield put(serviceReasonError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(serviceReasonError(config.generalError));
    }
  }
}

export function* serviceRestoreStart({ id, statusType }) {
  try {
    yield call(() => axios.post(`/services/actions/${id}/${statusType}`));
    yield put(fetchServiceStart());
    yield put(showNotification({
      key: 'service_restore_success',
      level: 'success',
      title: 'Service updated',
      message: 'The service has been successfully updated'
    }));
  } catch (error) {
    try {
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(showNotification());
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_CASE_DETAILS_START, caseDetailsFetch);
  yield takeLatest(CASE_REQUEST_DELETE, caseRequestDelete);
  yield takeLatest(SERVICE_REQUEST_DELETE, serviceRequestDelete);
  yield takeLatest(CASE_DELETE_START, caseDeleteStart);
  yield takeLatest(SERVICE_DELETE_START, serviceDeleteStart);
  yield takeLatest(REQUEST_DELETE_CLOSE_MODAL, handleCloseDeleteModal);
  yield takeLatest(SERVICE_REASON_START, serviceReasonStart);
  yield takeLatest(SERVICE_RESTORE_START, serviceRestoreStart);
}
