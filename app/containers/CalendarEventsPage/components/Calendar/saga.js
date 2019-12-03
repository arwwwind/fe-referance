import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios';
import config from '../../../../config';
import {
  SEARCH_CALENDAR_START,
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_NEW_PAGE
} from './constants';
import {
  fetchCalendarData,
  fetchCalendarError,
  fetchCalendarNewPage
} from './actions';
import { showNotification } from '../../../App/actions';

/**
 * Fetch calendar
 * @function calendarFetch
 */
export function* calendarFetch() {
  try {
    const page = yield select((data) => data.get('calendar').get('fetch').get('currentPage'));
    const { searchValue, serviceFilterValue, repFilterValue, venueFilterValue } = yield select((data) => data.get('calendar').get('search').get('searchValue'));
    const response = yield call(() => axios.get('calendar', {
      params: {
        page,
        serviceType: serviceFilterValue || undefined,
        repConfirmed: repFilterValue || undefined,
        venueId: venueFilterValue || undefined,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;

    yield put(fetchCalendarData(data));
  } catch (error) {
    try {
      yield put(fetchCalendarError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchCalendarError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* calendarResetAndFetch() {
  yield put(fetchCalendarNewPage(1));
}

export function* saga() {
  yield takeLatest(SEARCH_CALENDAR_START, calendarFetch);
  yield takeLatest(FETCH_CALENDAR_START, calendarFetch);
  yield takeLatest(FETCH_CALENDAR_NEW_PAGE, calendarResetAndFetch);
}
