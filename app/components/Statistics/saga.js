import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../config';
import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_NEW_PAGE
} from './constants';
import {
  fetchStatisticsData,
  fetchStatisticsError,
  fetchStatisticsNewPage
} from './actions';
import { showNotification } from '../../containers/App/actions';

/**
 * Fetch statistics
 * @function statisticsFetch
 */
export function* statisticsFetch() {
  try {
    const response = yield call(() => axios.get('metrics/dashboard/1'));
    const { data } = response.data;

    yield put(fetchStatisticsData(data));
  } catch (error) {
    try {
      yield put(fetchStatisticsError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchStatisticsError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* statisticsResetAndFetch() {
  yield put(fetchStatisticsNewPage(1));
}

export function* saga() {
  yield takeLatest(FETCH_STATISTICS_START, statisticsFetch);
  yield takeLatest(FETCH_STATISTICS_NEW_PAGE, statisticsResetAndFetch);
}
