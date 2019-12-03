import {
  FETCH_CASE_DETAILS_START,
  FETCH_CASE_DETAILS_ERROR,
  FETCH_CASE_DETAILS_RESULTS,
  CASE_REQUEST_DELETE,
  SERVICE_REQUEST_DELETE,
  CASE_DELETE_START,
  CASE_DELETE_SUCCESS,
  CASE_DELETE_ERROR,
  SERVICE_DELETE_START,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_ERROR,
  REQUEST_DELETE_OPEN_MODAL,
  REQUEST_DELETE_CLOSE_MODAL,
  SERVICE_REASON_START,
  SERVICE_REASON_SUCCESS,
  SERVICE_REASON_ERROR,
  SERVICE_REASON_OPEN_DRAWER,
  SERVICE_RESTORE_START
} from './constants';

/**
 * Fetch case details start
 * @function fetchCaseDetailsStart
 * @returns {Object} contains the type
 */
export function fetchCaseDetailsStart() {
  return {
    type: FETCH_CASE_DETAILS_START
  };
}

/**
 * Fetch case details error
 * @function fetchCaseDetailsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchCaseDetailsError(error) {
  return {
    type: FETCH_CASE_DETAILS_ERROR,
    error
  };
}

/**
 * Fetch case details data
 * @function fetchCaseDetailsData
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchCaseDetailsData(data) {
  return {
    type: FETCH_CASE_DETAILS_RESULTS,
    data
  };
}

/**
 * Case request delete
 * @function caseRequestDelete
 * @returns {Object} contains the type
 */
export function caseRequestDelete(id) {
  return {
    type: CASE_REQUEST_DELETE,
    id
  };
}

/**
 * Case delete confirm
 * @function caseRequestDelete
 * @returns {Object} contains the type
 */
export function caseDeleteStart(id) {
  return {
    type: CASE_DELETE_START,
    id
  };
}

/**
 * Case delete success
 * @function caseDeleteSuccess
 * @returns {Object} contains the type
 */
export function caseDeleteSuccess() {
  return {
    type: CASE_DELETE_SUCCESS
  };
}

/**
 * Case delete error
 * @function caseDeleteError
 * @returns {Object} contains the type
 */
export function caseDeleteError(error) {
  return {
    type: CASE_DELETE_ERROR,
    error
  };
}

/**
 * Service request delete
 * @function serviceRequestDelete
 * @returns {Object} contains the type
 */
export function serviceRequestDelete(id) {
  return {
    type: SERVICE_REQUEST_DELETE,
    id
  };
}

/**
 * Service delete start
 * @function serviceRequestDelete
 * @returns {Object} contains the type
 */
export function serviceDeleteStart(id, caseId) {
  return {
    type: SERVICE_DELETE_START,
    id,
    caseId
  };
}

/**
 * Service delete success
 * @function serviceDeleteSuccess
 * @returns {Object} contains the type
 */
export function serviceDeleteSuccess() {
  return {
    type: SERVICE_DELETE_SUCCESS
  };
}

/**
 * Service delete error
 * @function serviceDeleteError
 * @returns {Object} contains the type
 */
export function serviceDeleteError(error) {
  return {
    type: SERVICE_DELETE_ERROR,
    error
  };
}

/**
 * Case/Service open confirm delete modal
 * @function openDeleteModal
 * @returns {Object} contains the type
 */
export function openDeleteModal(id, entity) {
  return {
    type: REQUEST_DELETE_OPEN_MODAL,
    id,
    entity
  };
}

/**
 * Case/Service close confirm delete modal
 * @function closeDeleteModal
 * @returns {Object} contains the type
 */
export function closeDeleteModal(ids) {
  return {
    type: REQUEST_DELETE_CLOSE_MODAL,
    ids
  };
}

/**
 * Service add reason start
 * @function serviceReasonStart
 * @returns {Object} contains data, form
 */
export function serviceReasonStart(id, data, form, reasonType) {
  return {
    type: SERVICE_REASON_START,
    data,
    form,
    id,
    reasonType
  };
}

/**
 * Service add reason success
 * @function serviceReasonSuccess
 * @returns {Object} contains type
 */
export function serviceReasonSuccess() {
  return {
    type: SERVICE_REASON_SUCCESS
  };
}

/**
 * Service add reason error
 * @function serviceReasonError
 * @returns {Object} contains error
 */
export function serviceReasonError(error) {
  return {
    type: SERVICE_REASON_ERROR,
    error
  };
}

/**
 * Service add reason error
 * @function serviceReasonOpenDrawer
 * @returns {Object} contains actionType
 */
export function serviceReasonOpenDrawer(reasonType) {
  return {
    type: SERVICE_REASON_OPEN_DRAWER,
    reasonType
  };
}

/**
 * Service restore status
 * @function serviceRestoreStatus
 * @returns {Object} contains id, statusType
 */
export function serviceRestoreStatus(id, statusType) {
  return {
    type: SERVICE_RESTORE_START,
    id,
    statusType
  };
}
