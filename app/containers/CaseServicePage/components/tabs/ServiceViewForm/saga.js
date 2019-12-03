import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../axios';
import config from '../../../../../config';
import * as errors from '../../../../../utils/errors';
import { SINGLE_SERVICE_VIEW_START, SAVE_SERVICE_VIEW_START } from './constants';
import { hideDrawer, showDrawer } from '../../../../../components/Core/Drawer/actions';
import { singleServiceViewData, singleServiceViewError, saveServiceViewSuccess, saveServiceViewError } from './actions';
import { showNotification } from '../../../../App/actions';
import { fetchServiceStart } from '../../../actions';

/**
 * Show service view drawer form
 * @function showServiceViewDrawer
 */
export function* showServiceViewDrawer(action) {
  yield put(showDrawer(`serviceViewForm-${action.name}`));
  try {
    const response = yield call(() => axios.get(`cases/${action.caseId}/services/${action.serviceId}`));
    yield put(singleServiceViewData(response.data.data));
  } catch (error) {
    try {
      yield put(singleServiceViewError(error.response.data.errors));
    } catch (internal) {
      yield put(singleServiceViewError(config.generalError));
    }
  }
}

/**
 * Update service view
 * @function updateServiceView
 */
export function* updateServiceView(action) {
  try {
    const response = yield call(() => axios.put(`cases/${action.caseId}/services/${action.serviceId}`, { serviceType: action.serviceType, ...action.data }));
    yield put(saveServiceViewSuccess(response.data.data));
    yield put(hideDrawer(`serviceViewForm-${action.name}`));
    action.form.resetFields();
    yield put(fetchServiceStart());
  } catch (error) {
    try {
      yield put(saveServiceViewError(error.response.data.errors));
      errors.display(action.form, error.response.data.errors, action.data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveServiceViewError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export default function* saga() {
  yield takeLatest(SINGLE_SERVICE_VIEW_START, showServiceViewDrawer);
  yield takeLatest(SAVE_SERVICE_VIEW_START, updateServiceView);
}
