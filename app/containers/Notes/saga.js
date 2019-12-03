import { call, put, select, takeEvery } from 'redux-saga/effects';
import extend from 'lodash/extend';
import axios from '../../axios';
import config from '../../config';
import {
  SEARCH_NOTE_START,
  FETCH_NOTE_START,
  SAVE_NOTE_START,
  SINGLE_NOTE_START,
  DELETE_NOTE_START,
  FETCH_NOTE_NEW_PAGE,
  FETCH_NOTE_NEW_LIMIT,
} from './constants';
import {
  fetchNoteData,
  fetchNoteError,
  fetchNoteStart,
  saveNoteError,
  saveNoteSuccess,
  singleNoteData,
  singleNoteError,
  deleteNoteSuccess,
  deleteNoteError,
  searchNoteStart,
  fetchNoteNewPage,
} from './actions';
import { hideDrawer, showDrawer } from '../../components/Core/Drawer/actions';
import { showWindow, closeWindow } from '../WindowSystem/actions';
import * as errors from '../../utils/errors';
import { showNotification } from '../App/actions';

/**
 * Fetch notes
 * @function notesFetch
 */
function* notesFetch({ entityId, entityType }) {
  try {
    const page = yield select((data) => data.get('notes').get(entityType).get(entityId).get('fetch').get('currentPage'));
    const limit = yield select((data) => data.get('notes').get(entityType).get(entityId).get('limit'));
    const searchValue = yield select((data) => data.get('notes').get(entityType).get(entityId).get('search').get('searchValue'));

    const response = yield call(() => axios.get(searchValue ? 'search/notes' : 'notes', {
      params: {
        page,
        search: searchValue || undefined,
        entityType,
        entityId,
        limit
      }
    }));
    const { data } = response.data;
    data.rows = data.rows.map((item) => {
      item.entityId = entityId;
      item.entityType = entityType;

      return item;
    });

    yield put(fetchNoteData(entityId, entityType, data));
  } catch (error) {
    try {
      yield put(fetchNoteError(entityId, entityType, error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchNoteError(entityId, entityType, config.generalError));
      yield put(showNotification());
    }
  }
}

function* notesResetAndFetch({ entityId, entityType }) {
  yield put(fetchNoteNewPage(entityId, entityType, 1));
}

/**
 * Add notes
 * @function notesFetch
 */
function* formNoteSend({
  data,
  form,
  entityId,
  entityType,
  id
}) {
  try {
    const dataToSend = extend({
      entityType,
      entityId
    }, data);

    const response = yield call((id !== 'add') ? () => axios.put(`notes/${id}`, dataToSend) : () => axios.post('notes', dataToSend));
    const receivedData = response.data.data;
    const { files, idsToRemove } = data;

    // Add note files
    if (files && files.length) {
      for (let i = 0; i < files.length; i += 1) {
        const formData = new FormData();
        formData.append('file', files[i]);
        try {
          yield call(() => axios.post(`files/upload/note/${(id !== 'add') ? id : receivedData.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }));
        } catch (error) {
          try {
            if (error.response.data.errors.general && error.response.data.errors.general.length) {
              yield put(showNotification({
                key: 'upload_error',
                title: 'Upload Error',
                message: error.response.data.errors.general.join(', ')
              }));
            }
          } catch (internal) {
            yield put(showNotification({
              key: 'upload_error',
              title: 'Upload Error',
            }));
          }
        }
      }
    }

    // Remove note files
    if (idsToRemove && idsToRemove.length) {
      for (let i = 0; i < idsToRemove.length; i += 1) {
        try {
          yield call(() => axios.delete(`files/${idsToRemove[i]}`));
        } catch (error) {
          try {
            if (error.response.data.errors.general && error.response.data.errors.general.length) {
              yield put(showNotification({
                key: 'remove_file',
                title: 'Remove File Error',
                message: error.response.data.errors.general.join(', ')
              }));
            }
          } catch (internal) {
            yield put(showNotification({
              key: 'remove_file',
              title: 'Remove File Error',
            }));
          }
        }
      }
    }

    form.resetFields();

    yield put(saveNoteSuccess(entityId, entityType, receivedData));
    yield put(hideDrawer(`${entityType}Notes`));
    yield put(closeWindow(`${entityType}SaveNotes${entityId}-${id}`));
    yield put(fetchNoteStart(entityId, entityType));
  } catch (error) {
    try {
      yield put(saveNoteError(entityId, entityType, error.response.data.errors));
      errors.display(form, error.response.data.errors, data);
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      }
    } catch (internal) {
      yield put(saveNoteError(entityId, entityType, config.generalError));
      yield put(showNotification({
        placement: 'topLeft'
      }));
    }
  }
}

function* singleNoteStart({ id, entityId, entityType }) {
  yield put(showDrawer(`${entityType}Notes`));
  yield put(showWindow(`${entityType}SaveNotes${entityId}-${id}`, {
    type: 'addNotes',
    entityType,
    entityId,
    id
  }));

  if (id) {
    try {
      const response = yield call(() => axios.get(`notes/${id}`));
      const receivedData = response.data.data;

      yield put(singleNoteData(entityId, entityType, id, receivedData));
    } catch (error) {
      try {
        yield put(singleNoteError(entityId, entityType, id, error.response.data.errors));
        yield put(showNotification({
          message: error.response.data.errors.general.join(', '),
          placement: 'topLeft'
        }));
      } catch (internal) {
        yield put(singleNoteError(entityId, entityType, id, config.generalError));
        yield put(showNotification({
          placement: 'topLeft'
        }));
      }
    }
  }
}

/**
 * Delete notes
 * @function notesFetch
 */
function* deleteNotesSaga({ id, entityId, entityType }) {
  try {
    const response = yield call(() => axios.delete(`notes/${id}`));
    const receivedData = response.data.data;

    yield put(deleteNoteSuccess(entityId, entityType, receivedData));
    yield put(fetchNoteStart(entityId, entityType));
  } catch (error) {
    try {
      yield put(deleteNoteError(entityId, entityType, error.response.data.errors));
      yield put(showNotification({
        message: error.response.data.errors.general.join(', ')
      }));
    } catch (internal) {
      yield put(deleteNoteError(entityId, entityType, config.generalError));
      yield put(showNotification());
    }
  }
}

export default function* saga({ entityId, entityType }) {
  yield put(searchNoteStart(entityId, entityType, null));

  yield takeEvery(SEARCH_NOTE_START, notesResetAndFetch);
  yield takeEvery(FETCH_NOTE_START, notesResetAndFetch);
  yield takeEvery(FETCH_NOTE_NEW_PAGE, notesFetch);
  yield takeEvery(FETCH_NOTE_NEW_LIMIT, notesFetch);

  yield takeEvery(SAVE_NOTE_START, formNoteSend);
  yield takeEvery(SINGLE_NOTE_START, singleNoteStart);
  yield takeEvery(DELETE_NOTE_START, deleteNotesSaga);
}
