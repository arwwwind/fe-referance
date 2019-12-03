import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import {
  ORGANIZATION_OVERVIEW_START,
  FETCH_SINGLE_ORGANIZATION_START,
  ORGANIZATION_GENERATE_LIEN_REPORT_START
} from './constants';
import {
  fetchSingleOrganizationError,
  fetchSingleOrganizationSuccess,
  generateLienReportSuccess,
  generateLienReportError,
  organizationOverviewSuccess,
  organizationOverviewError
} from './actions';
import config from '../../config';
import { getOrganizationId } from '../../utils/router';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';
import { hideDrawer } from '../../components/Core/Drawer/actions';
import { formatDate } from '../../utils/common';

export function* singleOrganizationFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`organisations/${getOrganizationId(path)}`));
    const { data } = response.data;
    yield put(fetchSingleOrganizationSuccess(data));
  } catch (error) {
    try {
      yield put(fetchSingleOrganizationError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchSingleOrganizationError(config.generalError));
    }
  }
}

export function* organizationOverviewStart({ id }) {
  try {
    const response = yield call(() => axios.get(`/metrics/organisation/${id}/overview`));
    yield put(organizationOverviewSuccess(id, response.data.data));
  } catch (error) {
    try {
      yield put(organizationOverviewError(error.response.data.errors));
    } catch (internal) {
      yield put(organizationOverviewError(config.generalError));
    }
  }
}

export function* generateLienReport({ id, data, form }) {
  try {
    yield call(() => axios({
      url: '/exports/lien-reports',
      method: 'POST',
      responseType: 'blob',
      data: {
        organisationId: id,
        startDate: data.startDate ? formatDate(data.startDate, 'YYYY-MM-DD HH:mm:ssZZ') : undefined,
        endDate: data.endDate ? formatDate(data.endDate, 'YYYY-MM-DD HH:mm:ssZZ') : undefined
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.style = 'display: none';
      link.setAttribute('download', `lien-reports.xlsx`);
      document.body.appendChild(link);
      link.click();

      return true;
    }));

    form.resetFields();
    yield put(generateLienReportSuccess());
    yield put(hideDrawer('organizationGenerateLienReport'));
  } catch (error) {
    try {
      yield put(generateLienReportError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(generateLienReportError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SINGLE_ORGANIZATION_START, singleOrganizationFetch);
  yield takeLatest(ORGANIZATION_OVERVIEW_START, organizationOverviewStart);
  yield takeLatest(ORGANIZATION_GENERATE_LIEN_REPORT_START, generateLienReport);
}
