import {
  SEARCH_NOTE_START,
  FETCH_NOTE_START,
  FETCH_NOTE_ERROR,
  FETCH_NOTE_RESULTS,
  SINGLE_NOTE_START,
  SINGLE_NOTE_ERROR,
  SINGLE_NOTE_RESULTS,
  SAVE_NOTE_START,
  SAVE_NOTE_SUCCESS,
  SAVE_NOTE_ERROR,
  DELETE_NOTE_START,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  FETCH_NOTE_NEW_PAGE,
  FETCH_NOTE_NEW_LIMIT,
} from './constants';

/**
 * Search note start
 * @function searchNoteStart
 * @param entityId
 * @param entityType
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchNoteStart(entityId, entityType, value) {
  return {
    type: SEARCH_NOTE_START,
    value,
    entityId,
    entityType
  };
}

/**
 * Fetch note start
 * @function singleNoteStart
 * @param entityId
 * @param entityType
 * @param id
 * @returns {Object} contains the type
 */
export function singleNoteStart(entityId, entityType, id) {
  return {
    type: SINGLE_NOTE_START,
    entityId,
    entityType,
    id
  };
}

/**
 * Fetch note error
 * @function singleNoteError
 * @param entityId
 * @param entityType
 * @param id
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleNoteError(entityId, entityType, id, error) {
  return {
    type: SINGLE_NOTE_ERROR,
    error,
    entityId,
    entityType,
    id
  };
}

/**
 * Fetch note data
 * @function searchNoteResults
 * @param entityId
 * @param entityType
 * @param id
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleNoteData(entityId, entityType, id, data) {
  return {
    type: SINGLE_NOTE_RESULTS,
    data,
    entityId,
    entityType,
    id
  };
}

/**
 * Fetch note start
 * @function fetchNoteStart
 * @param entityId
 * @param entityType
 * @returns {Object} contains the type
 */
export function fetchNoteStart(entityId, entityType) {
  return {
    type: FETCH_NOTE_START,
    entityId,
    entityType
  };
}

/**
 * Fetch note error
 * @function fetchNoteError
 * @param entityId
 * @param entityType
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchNoteError(entityId, entityType, error) {
  return {
    type: FETCH_NOTE_ERROR,
    error,
    entityId,
    entityType
  };
}

/**
 * Fetch note data
 * @function searchNoteResults
 * @param entityId
 * @param entityType
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchNoteData(entityId, entityType, data) {
  return {
    type: FETCH_NOTE_RESULTS,
    data,
    entityId,
    entityType
  };
}

export function fetchNoteNewPage(entityId, entityType, page) {
  return {
    type: FETCH_NOTE_NEW_PAGE,
    page,
    entityId,
    entityType
  };
}

export function fetchNoteNewLimit(entityId, entityType, limit) {
  return {
    type: FETCH_NOTE_NEW_LIMIT,
    limit,
    entityId,
    entityType
  };
}

/**
 * Form note send
 * @function formNoteSend
 * @param entityId
 * @param entityType
 * @param id
 * @param {Array} data - array data
 * @param form
 * @returns {Object} contains the type and data
 */
export function saveNoteStart(entityId, entityType, id, data, form) {
  return {
    type: SAVE_NOTE_START,
    data,
    form,
    entityId,
    entityType,
    id
  };
}

/**
 * Create note success
 * @function saveNoteSuccess
 * @param entityId
 * @param entityType
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveNoteSuccess(entityId, entityType, data) {
  return {
    type: SAVE_NOTE_SUCCESS,
    data,
    entityId,
    entityType
  };
}

/**
 * Create note error
 * @function saveNoteError
 * @param entityId
 * @param entityType
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveNoteError(entityId, entityType, error) {
  return {
    type: SAVE_NOTE_ERROR,
    error,
    entityId,
    entityType
  };
}

/**
 * Delete note send
 * @function deleteNoteStart
 * @param entityId
 * @param entityType
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteNoteStart(entityId, entityType, id) {
  return {
    type: DELETE_NOTE_START,
    id,
    entityId,
    entityType
  };
}

/**
 * Delete note success
 * @function deleteNoteSuccess
 * @param entityId
 * @param entityType
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteNoteSuccess(entityId, entityType, data) {
  return {
    type: DELETE_NOTE_SUCCESS,
    data,
    entityId,
    entityType
  };
}

/**
 * Delete note error
 * @function deleteNoteError
 * @param entityId
 * @param entityType
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteNoteError(entityId, entityType, error) {
  return {
    type: DELETE_NOTE_ERROR,
    error,
    entityId,
    entityType
  };
}

