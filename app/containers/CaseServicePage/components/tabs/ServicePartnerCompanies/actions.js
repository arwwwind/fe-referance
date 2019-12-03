import {
  SEARCH_PARTNER_COMPANY_START,
  SEARCH_PARTNER_COMPANY_ERROR,
  SEARCH_PARTNER_COMPANY_RESULTS,
  FETCH_PARTNER_COMPANY_START,
  FETCH_PARTNER_COMPANY_ERROR,
  FETCH_PARTNER_COMPANY_RESULTS,
  SINGLE_PARTNER_COMPANY_START,
  SINGLE_PARTNER_COMPANY_ERROR,
  SINGLE_PARTNER_COMPANY_RESULTS,
  SAVE_PARTNER_COMPANY_START,
  SAVE_PARTNER_COMPANY_SUCCESS,
  SAVE_PARTNER_COMPANY_ERROR,
  DELETE_PARTNER_COMPANY_START,
  DELETE_PARTNER_COMPANY_SUCCESS,
  DELETE_PARTNER_COMPANY_ERROR,
  FETCH_PARTNER_COMPANY_NEW_PAGE,
} from './constants';

/**
 * Search partnerCompany start
 * @function searchPartnerCompanyStart
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchPartnerCompanyStart(value) {
  return {
    type: SEARCH_PARTNER_COMPANY_START,
    value
  };
}

/**
 * Search partnerCompany error
 * @function searchPartnerCompanyError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchPartnerCompanyError(error) {
  return {
    type: SEARCH_PARTNER_COMPANY_ERROR,
    error
  };
}

/**
 * Search partnerCompany results
 * @function searchPartnerCompanyResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchPartnerCompanyResults(results) {
  return {
    type: SEARCH_PARTNER_COMPANY_RESULTS,
    results
  };
}

/**
 * Fetch partnerCompany start
 * @function singlePartnerCompanyStart
 * @returns {Object} contains the type
 */
export function singlePartnerCompanyStart(id) {
  return {
    type: SINGLE_PARTNER_COMPANY_START,
    id
  };
}

/**
 * Fetch partnerCompany error
 * @function singlePartnerCompanyError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singlePartnerCompanyError(error) {
  return {
    type: SINGLE_PARTNER_COMPANY_ERROR,
    error
  };
}

/**
 * Fetch partnerCompany data
 * @function searchPartnerCompanyResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singlePartnerCompanyData(data) {
  return {
    type: SINGLE_PARTNER_COMPANY_RESULTS,
    data
  };
}

/**
 * Fetch partnerCompany start
 * @function fetchPartnerCompanyStart
 * @returns {Object} contains the type
 */
export function fetchPartnerCompanyStart() {
  return {
    type: FETCH_PARTNER_COMPANY_START
  };
}

/**
 * Fetch partnerCompany error
 * @function fetchPartnerCompanyError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchPartnerCompanyError(error) {
  return {
    type: FETCH_PARTNER_COMPANY_ERROR,
    error
  };
}

/**
 * Fetch partnerCompany data
 * @function searchPartnerCompanyResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchPartnerCompanyData(data) {
  return {
    type: FETCH_PARTNER_COMPANY_RESULTS,
    data
  };
}

export function fetchPartnerCompanyNewPage(page) {
  return {
    type: FETCH_PARTNER_COMPANY_NEW_PAGE,
    page
  };
}

/**
 * Form partnerCompany send
 * @function formPartnerCompanySend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function savePartnerCompanyStart(data, form) {
  return {
    type: SAVE_PARTNER_COMPANY_START,
    data,
    form
  };
}

/**
 * Create partnerCompany success
 * @function savePartnerCompanySuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function savePartnerCompanySuccess(data) {
  return {
    type: SAVE_PARTNER_COMPANY_SUCCESS,
    data
  };
}

/**
 * Create partnerCompany error
 * @function savePartnerCompanyError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function savePartnerCompanyError(error) {
  return {
    type: SAVE_PARTNER_COMPANY_ERROR,
    error
  };
}

/**
 * Delete partnerCompany send
 * @function deletePartnerCompanyStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deletePartnerCompanyStart(id) {
  return {
    type: DELETE_PARTNER_COMPANY_START,
    id
  };
}

/**
 * Delete partnerCompany success
 * @function deletePartnerCompanySuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deletePartnerCompanySuccess(data) {
  return {
    type: DELETE_PARTNER_COMPANY_SUCCESS,
    data
  };
}

/**
 * Delete partnerCompany error
 * @function deletePartnerCompanyError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deletePartnerCompanyError(error) {
  return {
    type: DELETE_PARTNER_COMPANY_ERROR,
    error
  };
}

