import {
  SINGLE_ORGANIZATION_FORM_TYPE_CHANGE,
  SEARCH_ORGANIZATION_START,
  SEARCH_ORGANIZATION_ERROR,
  SEARCH_ORGANIZATION_RESULTS,
  FETCH_ORGANIZATION_START,
  FETCH_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_RESULTS,
  SINGLE_ORGANIZATION_START,
  SINGLE_ORGANIZATION_ERROR,
  SINGLE_ORGANIZATION_RESULTS,
  SAVE_ORGANIZATION_START,
  SAVE_ORGANIZATION_SUCCESS,
  SAVE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_START,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_NEW_PAGE,
} from './constants';

/**
 * Organization form - type change
 * @function organizationFormTypeChange
 * @param {String} organizationType - organization type
 * @returns {Object} contains the type and organizationType
 */
export function organizationFormTypeChange(organizationType) {
  return {
    type: SINGLE_ORGANIZATION_FORM_TYPE_CHANGE,
    organizationType
  };
}

/**
 * Search organization start
 * @function searchOrganizationStart
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchOrganizationStart(value) {
  return {
    type: SEARCH_ORGANIZATION_START,
    value
  };
}

/**
 * Search organization error
 * @function searchOrganizationError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchOrganizationError(error) {
  return {
    type: SEARCH_ORGANIZATION_ERROR,
    error
  };
}

/**
 * Search organization results
 * @function searchOrganizationResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchOrganizationResults(results) {
  return {
    type: SEARCH_ORGANIZATION_RESULTS,
    results
  };
}

/**
 * Fetch organization start
 * @function singleOrganizationStart
 * @returns {Object} contains the type
 */
export function singleOrganizationStart(id) {
  return {
    type: SINGLE_ORGANIZATION_START,
    id
  };
}

/**
 * Fetch organization error
 * @function singleOrganizationError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleOrganizationError(error) {
  return {
    type: SINGLE_ORGANIZATION_ERROR,
    error
  };
}

/**
 * Fetch organization data
 * @function searchOrganizationResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleOrganizationData(data) {
  return {
    type: SINGLE_ORGANIZATION_RESULTS,
    data
  };
}

/**
 * Fetch organization start
 * @function fetchOrganizationStart
 * @returns {Object} contains the type
 */
export function fetchOrganizationStart() {
  return {
    type: FETCH_ORGANIZATION_START
  };
}

/**
 * Fetch organization error
 * @function fetchOrganizationError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchOrganizationError(error) {
  return {
    type: FETCH_ORGANIZATION_ERROR,
    error
  };
}

/**
 * Fetch organization data
 * @function searchOrganizationResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchOrganizationData(data) {
  return {
    type: FETCH_ORGANIZATION_RESULTS,
    data
  };
}

export function fetchOrganizationNewPage(page) {
  return {
    type: FETCH_ORGANIZATION_NEW_PAGE,
    page
  };
}

/**
 * Form organization send
 * @function formOrganizationSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveOrganizationStart(data, form) {
  return {
    type: SAVE_ORGANIZATION_START,
    data,
    form
  };
}

/**
 * Create organization success
 * @function saveOrganizationSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveOrganizationSuccess(data) {
  return {
    type: SAVE_ORGANIZATION_SUCCESS,
    data
  };
}

/**
 * Create organization error
 * @function saveOrganizationError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveOrganizationError(error) {
  return {
    type: SAVE_ORGANIZATION_ERROR,
    error
  };
}

/**
 * Delete organization send
 * @function deleteOrganizationStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteOrganizationStart(id) {
  return {
    type: DELETE_ORGANIZATION_START,
    id
  };
}

/**
 * Delete organization success
 * @function deleteOrganizationSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteOrganizationSuccess(data) {
  return {
    type: DELETE_ORGANIZATION_SUCCESS,
    data
  };
}

/**
 * Delete organization error
 * @function deleteOrganizationError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteOrganizationError(error) {
  return {
    type: DELETE_ORGANIZATION_ERROR,
    error
  };
}

