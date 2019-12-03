import {
  FETCH_SINGLE_ORGANIZATION_START,
  FETCH_SINGLE_ORGANIZATION_ERROR,
  FETCH_SINGLE_ORGANIZATION_SUCCESS,
  ORGANIZATION_GENERATE_LIEN_REPORT_START,
  ORGANIZATION_GENERATE_LIEN_REPORT_SUCCESS,
  ORGANIZATION_GENERATE_LIEN_REPORT_ERROR,
  ORGANIZATION_OVERVIEW_START,
  ORGANIZATION_OVERVIEW_SUCCESS,
  ORGANIZATION_OVERVIEW_ERROR
} from './constants';

/**
 * Fetch organization details start
 * @function fetchSingleOrganizationStart
 * @returns {Object} contains the type
 */
export function fetchSingleOrganizationStart() {
  return {
    type: FETCH_SINGLE_ORGANIZATION_START
  };
}

/**
 * Fetch organization details error
 * @function fetchSingleOrganizationError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchSingleOrganizationError(error) {
  return {
    type: FETCH_SINGLE_ORGANIZATION_ERROR,
    error
  };
}

/**
 * Fetch organization details data
 * @function fetchSingleOrganizationSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchSingleOrganizationSuccess(data) {
  return {
    type: FETCH_SINGLE_ORGANIZATION_SUCCESS,
    data
  };
}

/**
 * Generate lien report start
 * @function generateLienReportStart
 * @returns {Object} contains the type
 */
export function generateLienReportStart(id, data, form) {
  return {
    type: ORGANIZATION_GENERATE_LIEN_REPORT_START,
    id,
    data,
    form
  };
}

/**
 * Generate lien report success
 * @function generateLienReportSuccess
 * @returns {Object} contains the type and data
 */
export function generateLienReportSuccess() {
  return {
    type: ORGANIZATION_GENERATE_LIEN_REPORT_SUCCESS
  };
}

/**
 * Generate lien report error
 * @function generateLienReportError
 * @returns {Object} contains the type and error
 */
export function generateLienReportError(error) {
  return {
    type: ORGANIZATION_GENERATE_LIEN_REPORT_ERROR,
    error
  };
}

/**
 * Organization overview start
 * @function organizationOverviewStart
 * @returns {Object} contains the type
 */
export function organizationOverviewStart(id) {
  return {
    type: ORGANIZATION_OVERVIEW_START,
    id
  };
}

/**
 * Organization overview error
 * @function organizationOverviewError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function organizationOverviewError(error) {
  return {
    type: ORGANIZATION_OVERVIEW_ERROR,
    error
  };
}

/**
 * Organization overview data
 * @function organizationOverviewSuccess
 * @param id - id of organization
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function organizationOverviewSuccess(id, data) {
  return {
    type: ORGANIZATION_OVERVIEW_SUCCESS,
    id,
    data
  };
}
