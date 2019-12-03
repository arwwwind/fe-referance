import {
  SEARCH_CLIENT_UPDATE_START,
  FETCH_CLIENT_UPDATE_START,
  FETCH_CLIENT_UPDATE_ERROR,
  FETCH_CLIENT_UPDATE_SUCCESS,
  FETCH_CLIENT_UPDATE_NEW_PAGE,
  RESET_CLIENT_UPDATE_DATA,
  SAVE_CLIENT_UPDATE_START,
  SAVE_CLIENT_UPDATE_ERROR,
  SAVE_CLIENT_UPDATE_SUCCESS,
} from './constants';

/**
 * Reset client updates data
 * @function resetClientUpdatesData
 * @returns {Object} contains the type
 */
export function resetClientUpdatesData() {
  return {
    type: RESET_CLIENT_UPDATE_DATA
  };
}

/**
 * Search client updates start
 * @function searchClientUpdateStart
 * @returns {Object} contains the type and value
 */
export function searchClientUpdateStart(caseId, serviceId, searchValue, entity, entityId) {
  return {
    type: SEARCH_CLIENT_UPDATE_START,
    searchValue,
    entity,
    entityId,
    caseId,
    serviceId
  };
}

/**
 * Fetch client updates start
 * @function fetchClientUpdateStart
 * @returns {Object} contains the type
 */
export function fetchClientUpdateStart(caseId, serviceId, entity, entityId) {
  return {
    type: FETCH_CLIENT_UPDATE_START,
    entity,
    entityId,
    caseId,
    serviceId
  };
}

/**
 * Fetch client updates error
 * @function fetchClientUpdateError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchClientUpdateError(error) {
  return {
    type: FETCH_CLIENT_UPDATE_ERROR,
    error
  };
}

/**
 * Fetch client updates data
 * @function searchClientUpdateResults
 * @param {Number} caseId - caseId for client results
 * @param {Number} serviceId - serviceId for client results
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchClientUpdateData(caseId, serviceId, data) {
  return {
    type: FETCH_CLIENT_UPDATE_SUCCESS,
    caseId,
    serviceId,
    data
  };
}

export function fetchClientUpdateNewPage(caseId, serviceId, page, entity, entityId) {
  return {
    type: FETCH_CLIENT_UPDATE_NEW_PAGE,
    page,
    entity,
    entityId,
    caseId,
    serviceId
  };
}

export function saveClientUpdateStart(caseId, serviceId, data, form) {
  return {
    type: SAVE_CLIENT_UPDATE_START,
    caseId,
    serviceId,
    data,
    form
  };
}

export function saveClientUpdateError(caseId, serviceId, error) {
  return {
    type: SAVE_CLIENT_UPDATE_ERROR,
    error
  };
}

export function saveClientUpdateSuccess(caseId, serviceId, response) {
  return {
    type: SAVE_CLIENT_UPDATE_SUCCESS,
    caseId,
    serviceId,
    response
  };
}

