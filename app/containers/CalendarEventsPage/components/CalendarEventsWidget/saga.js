import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../../axios';
import config from '../../../../config';
import moment from 'moment';
import {
  SEARCH_CALENDAR_WIDGET_START,
  FETCH_CALENDAR_WIDGET_START,
  FETCH_CALENDAR_WIDGET_NEW_PAGE
} from './constants';
import {
  fetchCalendarWidgetData,
  fetchCalendarWidgetError,
  fetchCalendarWidgetNewPage
} from './actions';
import { showNotification } from '../../../App/actions';

/**
 * Fetch calendarWidget
 * @function calendarWidgetFetch
 */
export function* calendarWidgetFetch() {
  try {
    const page = yield select((data) => data.get('calendarWidget').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('calendarWidget').get('search').get('searchValue'));
    const response = yield call(() => axios.get('calendar', {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;
    const todayData = data.rows.filter((el) => moment(el.dateOfHEaring).isSame(moment(), 'day'));

    yield put(fetchCalendarWidgetData(todayData));
  } catch (error) {
    try {
      yield put(fetchCalendarWidgetError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchCalendarWidgetError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* calendarWidgetResetAndFetch() {
  yield put(fetchCalendarWidgetNewPage(1));
}

export function* saga() {
  yield takeLatest(FETCH_CALENDAR_WIDGET_START, calendarWidgetFetch);
  yield takeLatest(SEARCH_CALENDAR_WIDGET_START, calendarWidgetFetch);
  yield takeLatest(FETCH_CALENDAR_WIDGET_NEW_PAGE, calendarWidgetResetAndFetch);
}
