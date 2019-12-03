import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../../axios';
import config from '../../../config';
import {
  SEARCH_VENUE_START,
  FETCH_VENUE_START,
  SAVE_VENUE_START,
  SINGLE_VENUE_START,
  DELETE_VENUE_START,
  FETCH_VENUE_NEW_PAGE
} from './constants';
import {
  fetchVenueData,
  fetchVenueError,
  fetchVenueStart,
  saveVenueError,
  saveVenueSuccess,
  singleVenueData,
  singleVenueError,
  deleteVenueSuccess,
  deleteVenueError,
  searchVenueStart,
  fetchVenueNewPage,
} from './actions';
import { fetchSingleVenueStart } from '../../VenueSinglePage/actions';
import { hideDrawer, showDrawer } from '../../../components/Core/Drawer/actions';
import * as errors from '../../../utils/errors';
import { showNotification } from '../../App/actions';
import { fetchServiceStart } from '../../CaseServicePage/actions';

/**
 * Fetch venues
 * @function venuesFetch
 */
export function* venuesFetch() {
  try {
    const page = yield select((data) => data.get('venues').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('venues').get('search').get('searchValue'));

    const response = yield call(() => axios.get(searchValue ? 'search/venues' : 'venues', {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    const { data } = response.data;

    yield put(fetchVenueData(data));
  } catch (error) {
    try {
      yield put(fetchVenueError(error.response.data.errors));
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchVenueError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* venuesResetAndFetch() {
  yield put(fetchVenueNewPage(1));
}

/**
 * Add venues
 * @function venuesFetch
 */
export function* formVenueSend({ data, form }) {
  try {
    const state = yield select();
    const id = state.get('venues').get('id');

    const response = yield call(id ? () => axios.put(`venues/${id}`, data) : () => axios.post('venues', data));
    const receivedData = response.data.data;

    // get service
    yield put(fetchServiceStart());

    form.resetFields();

    yield put(saveVenueSuccess(receivedData));
    yield put(hideDrawer('venues'));
    yield put(fetchVenueStart());
    yield put(fetchSingleVenueStart());
  } catch (error) {
    try {
      yield put(saveVenueError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if(error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveVenueError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleVenueStart({ id }) {
  yield put(showDrawer('venues'));

  if(id) {
    try {
      const response = yield call(() => axios.get(`venues/${id}`));
      const receivedData = response.data.data;

      yield put(singleVenueData(receivedData));
    } catch (error) {
      try {
        yield put(singleVenueError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleVenueError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  }
}

/**
 * Delete venues
 * @function venuesFetch
 */
export function* deleteVenuesSaga({ id }) {
  try {
    const response = yield call(() => axios.delete(`venues/${id}`));
    const receivedData = response.data.data;

    yield put(deleteVenueSuccess(receivedData));
    yield put(fetchVenueStart());
  } catch (error) {
    try {
      yield put(deleteVenueError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteVenueError(config.generalError));
      yield put(showNotification());
    }
  }
}
export function* pageSaga() {
  yield put(searchVenueStart(null));

  yield takeLatest(SEARCH_VENUE_START, venuesResetAndFetch);
  yield takeLatest(FETCH_VENUE_START, venuesResetAndFetch);
  yield takeLatest(FETCH_VENUE_NEW_PAGE, venuesFetch);

  yield put(fetchVenueStart());
}

export function* drawerSaga() {
  yield takeLatest(SAVE_VENUE_START, formVenueSend);
  yield takeLatest(SINGLE_VENUE_START, singleVenueStart);
  yield takeLatest(DELETE_VENUE_START, deleteVenuesSaga);
}
