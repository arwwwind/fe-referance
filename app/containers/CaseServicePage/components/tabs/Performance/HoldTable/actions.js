import {
  SEARCH_HOLD_SERVICE_START,
  FETCH_HOLD_SERVICE_START,
  FETCH_HOLD_SERVICE_ERROR,
  FETCH_HOLD_SERVICE_SUCCESS,
  FETCH_HOLD_SERVICE_NEW_PAGE,
  RESET_HOLD_SERVICE_DATA
} from './constants';

/**
 * Reset client updates data
 * @function resetHoldServicesData
 * @returns {Object} contains the type
 */
export function resetHoldServicesData() {
  return {
    type: RESET_HOLD_SERVICE_DATA
  };
}

/**
 * Search client updates start
 * @function searchHoldServiceStart
 * @returns {Object} contains the type and value
 */
export function searchHoldServiceStart(caseId, serviceId, searchValue, entity, entityId) {
  return {
    type: SEARCH_HOLD_SERVICE_START,
    searchValue,
    entity,
    entityId,
    caseId,
    serviceId
  };
}

/**
 * Fetch client updates start
 * @function fetchHoldServiceStart
 * @returns {Object} contains the type
 */
export function fetchHoldServiceStart(caseId, serviceId, entity, entityId) {
  return {
    type: FETCH_HOLD_SERVICE_START,
    entity,
    entityId,
    caseId,
    serviceId
  };
}

/**
 * Fetch client updates error
 * @function fetchHoldServiceError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchHoldServiceError(error) {
  return {
    type: FETCH_HOLD_SERVICE_ERROR,
    error
  };
}

/**
 * Fetch client updates data
 * @function searchHoldServiceResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchHoldServiceData(data) {
  return {
    type: FETCH_HOLD_SERVICE_SUCCESS,
    data
  };
}

export function fetchHoldServiceNewPage(caseId, serviceId, page, entity, entityId) {
  return {
    type: FETCH_HOLD_SERVICE_NEW_PAGE,
    page,
    entity,
    entityId,
    caseId,
    serviceId
  };
}
