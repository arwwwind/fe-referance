import { call, put, select, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { delay } from 'redux-saga';
import axios from '../../../../../axios';
import {
  FETCH_LIENS_START,
  EDIT_LIENS_START,
} from './constants';
import {
  fetchLiensStart,
  fetchLiensData,
  fetchLiensError,
  editLiensError
} from './actions';
import config from '../../../../../config';
import { getCaseId } from '../../../../../utils/router';
import * as errors from '../../../../../utils/errors';
import { showNotification } from '../../../../App/actions';

/**
 * Get number of overlapping days between two ranges inclusive.
 * Example: (s1 = 08-12-2018 ; e1 = 10-12-2018) and (s2 = 09-12-2018 ; e2 = 14-12-2018) => 2 // 9 and 10
 * @param s1 - start date of first range
 * @param e1 - end date of first range
 * @param s2 - start date of second range
 * @param e2 - end date of second range
 * @returns {number}
 */
const daysOverlapping = (s1, e1, s2, e2) => {
  const days = moment.min(moment(e1), moment(e2)).diff(moment.max(moment(s1), moment(s2)), 'days') + 1;
  return days >= 0 ? days : 0;
};

const prepare = (data) => {
  const { service } = data;

  service.permantAndStationeryDate = service.permantAndStationeryDate ? moment(service.permantAndStationeryDate) : null;
  service.caseSettlementDate = service.caseSettlementDate ? moment(service.caseSettlementDate) : null;
  service.dateOfNoticeToCarrier = service.dateOfNoticeToCarrier ? moment(service.dateOfNoticeToCarrier) : null;
  data.dateOfNoticeToCarrier = data.dateOfNoticeToCarrier ? moment(data.dateOfNoticeToCarrier) : null;

  return data;
};

export function* liensFetch({ id }) {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`cases/${getCaseId(path)}/edd-liens/${id}`));
    const { data } = response.data;

    const eddChartData = data.periods.filter(p => p.party === 'edd');
    const clientChartData = data.periods.filter(p => p.party === 'client');

    const chartData = eddChartData.map((c, index) => {
      let possibleData = {};

      if (clientChartData[index]) {
        possibleData = {
          type: clientChartData[index] ? clientChartData[index].paymentType : undefined,
          overlap: daysOverlapping(c.startDate, c.endDate, clientChartData[index].startDate, clientChartData[index].endDate)
        };
      } else {
        possibleData = {
          type: undefined,
          overlap: 0
        };
      }
      return {
        name: `${moment(c.startDate).format('MM/DD/YYYY')} - ${moment(c.endDate).format('MM/DD/YYYY')}`,
        ...possibleData
      };
    });

    yield put(fetchLiensData(prepare(data), chartData, chartData.reduce((total, item) => total + item.overlap, 0), 0, 0));
  } catch (error) {
    try {
      yield put(fetchLiensError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchLiensError(config.generalError));
    }
  }
}

export function* formLiensSend({ id, data, form, onClose }) {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    yield call(() => axios.put(`cases/${getCaseId(path)}/edd-liens/${id}`, data));

    onClose();
    yield delay(300);

    yield put(fetchLiensStart(id));
  } catch (error) {
    try {
      yield put(editLiensError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(editLiensError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_LIENS_START, liensFetch);
  yield takeLatest(EDIT_LIENS_START, formLiensSend);
}
