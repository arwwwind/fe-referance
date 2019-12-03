import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import isUndefined from 'lodash/isUndefined';
import axios from '../../axios';
import config from '../../config';
import {
  SEARCH_CONTACT_START,
  FETCH_CONTACT_START,
  SAVE_CONTACT_START,
  SINGLE_CONTACT_START,
  DELETE_CONTACT_START,
  FETCH_CONTACT_NEW_PAGE,
  QUICK_VIEW_CHANGE,
} from './constants';
import {
  fetchContactData,
  fetchContactError,
  fetchContactStart,
  saveContactError,
  saveContactSuccess,
  singleContactData,
  singleContactError,
  deleteContactSuccess,
  deleteContactError,
  searchContactStart,
  fetchContactNewPage,
  contactFormTypeChange, quickViewChange,
} from './actions';
import { fetchSingleContactStart } from '../ContactSinglePage/actions';
import { hideDrawer, showDrawer } from '../../components/Core/Drawer/actions';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';
import {
  DEFAULT_VIEW,
  VIEW_ADJUSTERS,
  VIEW_MANAGERS,
  VIEW_INJURED_WORKERS,
  VIEW_JUVO_REPS,
  VIEW_EMPLOYEES,
  VIEW_OTHERS,
} from './components/QuickView';
import { fetchServiceStart } from '../CaseServicePage/actions';

const getQuickViewType = (option) => {
  switch (option) {
    case VIEW_ADJUSTERS: return 'adjuster';
    case VIEW_MANAGERS: return 'manager';
    case VIEW_INJURED_WORKERS: return 'injured-worker';
    case VIEW_JUVO_REPS: return 'juvo-rep';
    case VIEW_EMPLOYEES: return 'employee';
    case VIEW_OTHERS: return 'other';
    default: return '';
  }
};

const getRequestEndpoint = (searchValue, quickView) => {
  if (quickView !== DEFAULT_VIEW) {
    return `search/contact-profiles/${getQuickViewType(quickView)}`;
  }

  if (searchValue) {
    return 'search/contact-profiles';
  }

  return 'contact-profiles';
};

/**
 * Fetch contacts
 * @function contactsFetch
 */
export function* contactsFetch({ sortId, sortOrder }) {
  try {
    const page = yield select((data) => data.get('contacts').get('fetch').get('currentPage'));
    const searchValue = yield select((data) => data.get('contacts').get('search').get('searchValue'));
    const quickView = yield select((data) => data.get('contacts').get('fetch').get('quickView'));

    const response = yield call(() => axios.get(getRequestEndpoint(searchValue, quickView), {
      params: {
        page,
        search: searchValue || undefined,
        sortId,
        sortOrder
      }
    }));
    const { data } = response.data;

    yield put(fetchContactData(data));
  } catch (error) {
    try {
      yield put(fetchContactError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchContactError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* contactsResetAndFetch() {
  const state = yield select();
  const fetch = state.get('contacts').get('fetch');

  yield put(fetchContactNewPage(1, fetch.get('sortId'), fetch.get('sortOrder')));
}

/**
 * Add contacts
 * @function contactsFetch
 */
export function* formContactSend({ data, form }) {
  try {
    const state = yield select();
    const fetch = state.get('contacts').get('fetch');
    const id = state.get('contacts').get('id');

    const response = yield call(id ? () => axios.put(`contact-profiles/${id}`, data) : () => axios.post('contact-profiles', data));
    const receivedData = response.data.data;

    // get service
    yield put(fetchServiceStart());

    // send image
    const { contactImage } = data;
    const contactId = id || receivedData.id;
    const changeImage = !isUndefined(contactImage);

    if (changeImage) {
      const formData = new FormData();
      formData.append('file', contactImage);
      try {
        yield call(() => ((contactImage === null) ? axios.delete(`files/avatar/${contactId}`) : axios.post(`files/upload/avatar/${contactId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })));
      } catch (error) {
        if (error.response.data.errors.general && error.response.data.errors.general.length) {
          yield put(showNotification({
            key: 'upload_contact_avatar',
            title: 'Upload Error',
            message: error.response.data.errors.general.join(', ')
          }));
        } else {
          yield put(showNotification({
            key: 'upload_contact_avatar',
            title: 'Upload Error',
          }));
        }
      }
    }

    form.resetFields();

    yield put(saveContactSuccess(receivedData));
    yield put(hideDrawer('contacts'));
    yield put(fetchContactStart(fetch.get('sortId'), fetch.get('sortOrder')));
    yield put(fetchSingleContactStart(id));
  } catch (error) {
    try {
      yield put(saveContactError(error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveContactError(config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

export function* singleContactStart({ id }) {
  yield put(showDrawer('contacts'));

  if (id) {
    try {
      const response = yield call(() => axios.get(`contact-profiles/${id}`));
      const receivedData = response.data.data;
      yield put(contactFormTypeChange(receivedData.contactType ? receivedData.contactType : undefined));
      yield put(singleContactData(receivedData));
    } catch (error) {
      try {
        yield put(singleContactError(error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleContactError(config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  } else {
    yield delay();
    yield put(contactFormTypeChange(undefined));
    yield put(singleContactData(null));
  }
}

/**
 * Delete contacts
 * @function contactsFetch
 */
export function* deleteContactsSaga({ id }) {
  try {
    const response = yield call(() => axios.delete(`contact-profiles/${id}`));
    const receivedData = response.data.data;
    const state = yield select();
    const fetch = state.get('contacts').get('fetch');

    yield put(deleteContactSuccess(receivedData));
    yield put(fetchContactStart(fetch.get('sortId'), fetch.get('sortOrder')));
  } catch (error) {
    try {
      yield put(deleteContactError(error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteContactError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* pageSaga() {
  yield put(searchContactStart(null));
  yield put(quickViewChange(DEFAULT_VIEW));

  yield takeLatest(SEARCH_CONTACT_START, contactsResetAndFetch);
  yield takeLatest(FETCH_CONTACT_START, contactsResetAndFetch);
  yield takeLatest(FETCH_CONTACT_NEW_PAGE, contactsFetch);
  yield takeLatest(QUICK_VIEW_CHANGE, contactsFetch);
}

export function* drawerSaga() {
  yield takeLatest(SAVE_CONTACT_START, formContactSend);
  yield takeLatest(SINGLE_CONTACT_START, singleContactStart);
  yield takeLatest(DELETE_CONTACT_START, deleteContactsSaga);
}
