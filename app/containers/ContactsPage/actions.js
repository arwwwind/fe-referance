import {
  SINGLE_CONTACT_FORM_TYPE_CHANGE,
  SEARCH_CONTACT_START,
  SEARCH_CONTACT_ERROR,
  SEARCH_CONTACT_RESULTS,
  FETCH_CONTACT_START,
  FETCH_CONTACT_ERROR,
  FETCH_CONTACT_RESULTS,
  SINGLE_CONTACT_START,
  SINGLE_CONTACT_ERROR,
  SINGLE_CONTACT_RESULTS,
  SAVE_CONTACT_START,
  SAVE_CONTACT_SUCCESS,
  SAVE_CONTACT_ERROR,
  DELETE_CONTACT_START,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_ERROR,
  FETCH_CONTACT_NEW_PAGE,
  QUICK_VIEW_CHANGE
} from './constants';

export function quickViewChange(option, sortId, sortOrder) {
  return {
    type: QUICK_VIEW_CHANGE,
    option,
    sortId,
    sortOrder
  };
}

/**
 * Contact form - type change
 * @function contactFormTypeChange
 * @param {String} contactType - contact type
 * @returns {Object} contains the type and contactType
 */
export function contactFormTypeChange(contactType) {
  return {
    type: SINGLE_CONTACT_FORM_TYPE_CHANGE,
    contactType
  };
}

/**
 * Search contact start
 * @function searchContactStart
 * @param {String} value - search value
 * @param sortId
 * @param sortOrder
 * @returns {Object} contains the type and value
 */
export function searchContactStart(value, sortId, sortOrder) {
  return {
    type: SEARCH_CONTACT_START,
    value,
    sortId,
    sortOrder
  };
}

/**
 * Search contact error
 * @function searchContactError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchContactError(error) {
  return {
    type: SEARCH_CONTACT_ERROR,
    error
  };
}

/**
 * Search contact results
 * @function searchContactResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchContactResults(results) {
  return {
    type: SEARCH_CONTACT_RESULTS,
    results
  };
}

/**
 * Fetch contact start
 * @function singleContactStart
 * @returns {Object} contains the type
 */
export function singleContactStart(id) {
  return {
    type: SINGLE_CONTACT_START,
    id
  };
}

/**
 * Fetch contact error
 * @function singleContactError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleContactError(error) {
  return {
    type: SINGLE_CONTACT_ERROR,
    error
  };
}

/**
 * Fetch contact data
 * @function searchContactResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleContactData(data) {
  return {
    type: SINGLE_CONTACT_RESULTS,
    data
  };
}

/**
 * Fetch contact start
 * @function fetchContactStart
 * @returns {Object} contains the type
 */
export function fetchContactStart(sortId, sortOrder) {
  return {
    type: FETCH_CONTACT_START,
    sortId,
    sortOrder
  };
}

/**
 * Fetch contact error
 * @function fetchContactError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchContactError(error) {
  return {
    type: FETCH_CONTACT_ERROR,
    error
  };
}

/**
 * Fetch contact data
 * @function searchContactResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchContactData(data) {
  return {
    type: FETCH_CONTACT_RESULTS,
    data
  };
}

export function fetchContactNewPage(page, sortId, sortOrder) {
  return {
    type: FETCH_CONTACT_NEW_PAGE,
    page,
    sortId,
    sortOrder
  };
}

/**
 * Form contact send
 * @function formContactSend
 * @param {Array} data
 * @param {Object} form
 * @returns {Object} contains the form and data
 */
export function saveContactStart(data, form) {
  return {
    type: SAVE_CONTACT_START,
    data,
    form
  };
}

/**
 * Create contact success
 * @function saveContactSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveContactSuccess(data) {
  return {
    type: SAVE_CONTACT_SUCCESS,
    data
  };
}

/**
 * Create contact error
 * @function saveContactError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveContactError(error) {
  return {
    type: SAVE_CONTACT_ERROR,
    error
  };
}

/**
 * Delete contact send
 * @function deleteContactStart
 * @param {Number} id
 * @returns {Object} contains the type and data
 */
export function deleteContactStart(id) {
  return {
    type: DELETE_CONTACT_START,
    id
  };
}

/**
 * Delete contact success
 * @function deleteContactSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteContactSuccess(data) {
  return {
    type: DELETE_CONTACT_SUCCESS,
    data
  };
}

/**
 * Delete contact error
 * @function deleteContactError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteContactError(error) {
  return {
    type: DELETE_CONTACT_ERROR,
    error
  };
}

