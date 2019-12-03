import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../../../axios';
import config from '../../../../../config';
import {
  SEARCH_PERSON_EVENTS_START,
  FETCH_PERSON_EVENTS_START,
  SAVE_PERSON_EVENTS_START,
  SINGLE_PERSON_EVENTS_START,
  DELETE_PERSON_EVENTS_START,
  FETCH_PERSON_EVENTS_NEW_PAGE
} from './constants';
import {
  fetchPersonEventsData,
  fetchPersonEventsError,
  fetchPersonEventsStart,
  savePersonEventsError,
  savePersonEventsSuccess,
  singlePersonEventsData,
  singlePersonEventsError,
  deletePersonEventsSuccess,
  deletePersonEventsError,
  searchPersonEventsStart,
  fetchPersonEventsNewPage,
} from './actions';
import {
  fetchCalendarStart
} from '../../../../CalendarEventsPage/components/Calendar/actions';
import {
  fetchCalendarWidgetStart
} from '../../../../CalendarEventsPage/components/CalendarEventsWidget/actions';
import { getServiceId, getCaseId } from '../../../../../utils/router';
import { hideDrawer, showDrawer } from '../../../../../components/Core/Drawer/actions';
import * as errors from '../../../../../utils/errors';
import { showNotification } from '../../../../App/actions';

/**
 * Fetch personEvents
 * @function personEventsFetch
 */
export function* personEventsFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const page = yield select((data) => data.get('personEvents').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('personEvents').get('search').get('searchValue'));

    const response = yield call(() => axios.get(searchValue ? `/search/in-person-events?entity=service&entityId=${getServiceId(path)}` : `/search/in-person-events?entity=service&entityId=${getServiceId(path)}`, {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;

    yield put(fetchPersonEventsData(data));
  } catch (error) {
    try {
      yield put(fetchPersonEventsError(error.response.data.errors));
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchPersonEventsError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* personEventsResetAndFetch() {
  yield put(fetchPersonEventsNewPage(1));
}

/**
 * Add personEvents
 * @function personEventsFetch
 */
export function* formPersonEventsSend({ data, form }) {
  try {
    const path = yield select((pathData) => pathData.get('route').get('location').get('pathname'));
    const state = yield select();
    const id = state.get('personEvents').get('id');

    // If we are on Calendar, get serviceId from drawer, else if we are on Person Events, get it from path
    data.serviceId = data.serviceId || getServiceId(path);

    const response = yield call(id ? () => axios.put(`/in-person-events/${id}`, data) : () => axios.post('/in-person-events', data));
    const receivedData = response.data.data;

    form.resetFields();

    yield put(savePersonEventsSuccess(receivedData));
    yield put(hideDrawer('personEvents'));
    yield put(fetchPersonEventsStart());
    yield put(fetchCalendarStart());
    yield put(fetchCalendarWidgetStart());
  } catch (error) {
    try {
      yield put(savePersonEventsError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(savePersonEventsError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singlePersonEventsStart({ id }) {
  yield put(showDrawer('personEvents'));
  const path = yield select((data) => data.get('route').get('location').get('pathname'));
  if (id) {
    try {
      const response = yield call(() => axios.get(`/in-person-events/${id}`));
      const receivedData = response.data.data;

      yield put(singlePersonEventsData(receivedData));
    } catch (error) {
      try {
        yield put(singlePersonEventsError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singlePersonEventsError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  }
}

/**
 * Delete personEvents
 * @function personEventsFetch
 */
export function* deletePersonEventsSaga({ id }) {
  try {
    const path = yield select((pathData) => pathData.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.delete(`/in-person-events/${id}`));
    const receivedData = response.data.data;

    yield put(deletePersonEventsSuccess(receivedData));
    yield put(fetchPersonEventsStart());
  } catch (error) {
    try {
      yield put(deletePersonEventsError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deletePersonEventsError(config.generalError));
      yield put(showNotification());
    }
  }
}
export function* pageSaga() {
  yield put(searchPersonEventsStart(null));

  yield takeLatest(SEARCH_PERSON_EVENTS_START, personEventsResetAndFetch);
  yield takeLatest(FETCH_PERSON_EVENTS_START, personEventsResetAndFetch);
  yield takeLatest(FETCH_PERSON_EVENTS_NEW_PAGE, personEventsFetch);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_PERSON_EVENTS_START, formPersonEventsSend);
  yield takeLatest(SINGLE_PERSON_EVENTS_START, singlePersonEventsStart);
  yield takeLatest(DELETE_PERSON_EVENTS_START, deletePersonEventsSaga);
}
