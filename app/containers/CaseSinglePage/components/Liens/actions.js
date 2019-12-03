import {
  SEARCH_LIEN_START,
  FETCH_LIEN_START,
  FETCH_LIEN_ERROR,
  FETCH_LIEN_SUCCESS,
  SINGLE_LIEN_START,
  SINGLE_LIEN_ERROR,
  SINGLE_LIEN_SUCCESS,
  SAVE_LIEN_START,
  SAVE_LIEN_SUCCESS,
  SAVE_LIEN_ERROR,
  DELETE_LIEN_START,
  DELETE_LIEN_SUCCESS,
  DELETE_LIEN_ERROR,
  FETCH_LIEN_NEW_PAGE,
  RESET_LIEN_DATA,
  STATISTICS_LIEN_START,
  STATISTICS_LIEN_SUCCESS,
  STATISTICS_LIEN_ERROR
} from './constants';

/**
 * Reset liens data
 * @function resetLiensData
 * @returns {Object} contains the type
 */
export function resetLiensData() {
  return {
    type: RESET_LIEN_DATA
  };
}

/**
 * Search lien start
 * @function searchLienStart
 * @returns {Object} contains the type and value
 */
export function searchLienStart(serviceId, searchValue, entity, entityId) {
  return {
    type: SEARCH_LIEN_START,
    searchValue,
    entity,
    entityId,
    serviceId
  };
}

/**
 * Fetch lien start
 * @function singleLienStart
 * @returns {Object} contains the type
 */
export function singleLienStart(id) {
  return {
    type: SINGLE_LIEN_START,
    id
  };
}

/**
 * Fetch lien error
 * @function singleLienError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleLienError(error) {
  return {
    type: SINGLE_LIEN_ERROR,
    error
  };
}

/**
 * Fetch lien data
 * @function searchLienResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleLienData(data) {
  return {
    type: SINGLE_LIEN_SUCCESS,
    data
  };
}

/**
 * Fetch lien start
 * @function fetchLienStart
 * @returns {Object} contains the type
 */
export function fetchLienStart(serviceId, entity, entityId) {
  return {
    type: FETCH_LIEN_START,
    serviceId,
    entity,
    entityId
  };
}

/**
 * Fetch lien error
 * @function fetchLienError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchLienError(error) {
  return {
    type: FETCH_LIEN_ERROR,
    error
  };
}

/**
 * Fetch lien data
 * @function searchLienResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchLienData(data) {
  return {
    type: FETCH_LIEN_SUCCESS,
    data
  };
}

export function fetchLienNewPage(serviceId, page, entity, entityId) {
  return {
    type: FETCH_LIEN_NEW_PAGE,
    page,
    entity,
    entityId,
    serviceId
  };
}

/**
 * Form lien send
 * @function formLienSend
 * @param {Array} data - array data
 * @param {Array} form
 * @param {number} id - lien id
 * @param serviceId
 * @returns {Object} contains the type and data
 */
export function saveLienStart(data, form, id, serviceId) {
  return {
    type: SAVE_LIEN_START,
    data,
    form,
    id,
    serviceId
  };
}

/**
 * Create lien success
 * @function saveLienSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveLienSuccess(data) {
  return {
    type: SAVE_LIEN_SUCCESS,
    data
  };
}

/**
 * Create lien error
 * @function saveLienError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveLienError(error) {
  return {
    type: SAVE_LIEN_ERROR,
    error
  };
}

/**
 * Delete lien send
 * @function deleteLienStart
 * @param {Array} id - lien id
 * @param serviceId
 * @returns {Object} contains the type and data
 */
export function deleteLienStart(id, serviceId) {
  return {
    type: DELETE_LIEN_START,
    id,
    serviceId
  };
}

/**
 * Delete lien success
 * @function deleteLienSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteLienSuccess(data) {
  return {
    type: DELETE_LIEN_SUCCESS,
    data
  };
}

/**
 * Delete lien error
 * @function deleteLienError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteLienError(error) {
  return {
    type: DELETE_LIEN_ERROR,
    error
  };
}

/**
 * Statistics lien start
 * @function statisticsLienStart
 * @param {Number} id - case id
 * @returns {Object}
 */
export function statisticsLienStart(id) {
  return {
    type: STATISTICS_LIEN_START,
    id
  };
}

/**
 * Statistics lien success
 * @function statisticsLienSuccess
 * @param {Array} data - array data
 * @returns {Object}
 */
export function statisticsLienSuccess(data) {
  return {
    type: STATISTICS_LIEN_SUCCESS,
    data
  };
}

/**
 * Statistics lien error
 * @function statisticsLienError
 * @param {Object} error - object error
 * @returns {Object}
 */
export function statisticsLienError(error) {
  return {
    type: STATISTICS_LIEN_ERROR,
    error
  };
}
