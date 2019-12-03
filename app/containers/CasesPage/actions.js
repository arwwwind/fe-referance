import {
  SEARCH_CASE_START,
  FETCH_CASE_START,
  FETCH_CASE_ERROR,
  FETCH_CASE_SUCCESS,
  SINGLE_CASE_START,
  SINGLE_CASE_ERROR,
  SINGLE_CASE_SUCCESS,
  SAVE_CASE_START,
  SAVE_CASE_SUCCESS,
  SAVE_CASE_ERROR,
  DELETE_CASE_START,
  DELETE_CASE_SUCCESS,
  DELETE_CASE_ERROR,
  FETCH_CASE_NEW_PAGE,
  RESET_CASE_DATA,
  QUICK_VIEW_CHANGE
} from './constants';

export function quickViewChange(option) {
  return {
    type: QUICK_VIEW_CHANGE,
    option
  };
}

/**
 * Reset cases data
 * @function resetCasesData
 * @returns {Object} contains the type
 */
export function resetCasesData() {
  return {
    type: RESET_CASE_DATA
  };
}

/**
 * Search case start
 * @function searchCaseStart
 * @returns {Object} contains the type and value
 */
export function searchCaseStart(searchValue, entity, entityId) {
  return {
    type: SEARCH_CASE_START,
    searchValue,
    entity,
    entityId
  };
}

/**
 * Fetch case start
 * @function singleCaseStart
 * @returns {Object} contains the type
 */
export function singleCaseStart(id) {
  return {
    type: SINGLE_CASE_START,
    id
  };
}

/**
 * Fetch case error
 * @function singleCaseError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleCaseError(error) {
  return {
    type: SINGLE_CASE_ERROR,
    error
  };
}

/**
 * Fetch case data
 * @function searchCaseResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleCaseData(data) {
  return {
    type: SINGLE_CASE_SUCCESS,
    data
  };
}

/**
 * Fetch case start
 * @function fetchCaseStart
 * @returns {Object} contains the type
 */
export function fetchCaseStart(entity, entityId) {
  return {
    type: FETCH_CASE_START,
    entity,
    entityId
  };
}

/**
 * Fetch case error
 * @function fetchCaseError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchCaseError(error) {
  return {
    type: FETCH_CASE_ERROR,
    error
  };
}

/**
 * Fetch case data
 * @function searchCaseResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchCaseData(data) {
  return {
    type: FETCH_CASE_SUCCESS,
    data
  };
}

export function fetchCaseNewPage(page, entity, entityId) {
  return {
    type: FETCH_CASE_NEW_PAGE,
    page,
    entity,
    entityId
  };
}

/**
 * Form case send
 * @function formCaseSend
 * @param {Array} data - array data
 * @param {Array} form
 * @param {number} id - case id
 * @param addServices
 * @returns {Object} contains the type and data
 */
export function saveCaseStart(data, form, id, addServices) {
  return {
    type: SAVE_CASE_START,
    data,
    form,
    id,
    addServices
  };
}

/**
 * Create case success
 * @function saveCaseSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveCaseSuccess(data) {
  return {
    type: SAVE_CASE_SUCCESS,
    data
  };
}

/**
 * Create case error
 * @function saveCaseError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveCaseError(error) {
  return {
    type: SAVE_CASE_ERROR,
    error
  };
}

/**
 * Delete case send
 * @function deleteCaseStart
 * @param {Array} id - case id
 * @returns {Object} contains the type and data
 */
export function deleteCaseStart(id) {
  return {
    type: DELETE_CASE_START,
    id
  };
}

/**
 * Delete case success
 * @function deleteCaseSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteCaseSuccess(data) {
  return {
    type: DELETE_CASE_SUCCESS,
    data
  };
}

/**
 * Delete case error
 * @function deleteCaseError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteCaseError(error) {
  return {
    type: DELETE_CASE_ERROR,
    error
  };
}

