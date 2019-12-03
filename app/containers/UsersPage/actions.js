import {
  SEARCH_USER_START,
  SEARCH_USER_ERROR,
  SEARCH_USER_RESULTS,
  FETCH_USER_START,
  FETCH_USER_ERROR,
  FETCH_USER_RESULTS,
  SINGLE_USER_START,
  SINGLE_USER_ERROR,
  SINGLE_USER_RESULTS,
  SAVE_USER_START,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  SWITCH_USER_STATUS_ERROR,
  SWITCH_USER_STATUS_START,
  SWITCH_USER_STATUS_SUCCESS
} from './constants';

/**
 * Search user start
 * @function searchUserStart
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchUserStart(value) {
  return {
    type: SEARCH_USER_START,
    value
  };
}

/**
 * Search user error
 * @function searchUserError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchUserError(error) {
  return {
    type: SEARCH_USER_ERROR,
    error
  };
}

/**
 * Search user results
 * @function searchUserResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchUserResults(results) {
  return {
    type: SEARCH_USER_RESULTS,
    results
  };
}

/**
 * Fetch user start
 * @function singleUserStart
 * @returns {Object} contains the type
 */
export function singleUserStart(id) {
  return {
    type: SINGLE_USER_START,
    id
  };
}

/**
 * Fetch user error
 * @function singleUserError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleUserError(error) {
  return {
    type: SINGLE_USER_ERROR,
    error
  };
}

/**
 * Fetch user data
 * @function searchUserResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleUserData(data) {
  return {
    type: SINGLE_USER_RESULTS,
    data
  };
}

/**
 * Fetch user start
 * @function fetchUserStart
 * @returns {Object} contains the type
 */
export function fetchUserStart() {
  return {
    type: FETCH_USER_START
  };
}

/**
 * Fetch user error
 * @function fetchUserError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchUserError(error) {
  return {
    type: FETCH_USER_ERROR,
    error
  };
}

/**
 * Fetch user data
 * @function searchUserResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchUserData(data) {
  return {
    type: FETCH_USER_RESULTS,
    data
  };
}

/**
 * Form user send
 * @function formUserSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveUserStart(data, form) {
  return {
    type: SAVE_USER_START,
    data,
    form
  };
}

/**
 * Create user success
 * @function saveUserSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveUserSuccess(data) {
  return {
    type: SAVE_USER_SUCCESS,
    data
  };
}

/**
 * Create user error
 * @function saveUserError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveUserError(error) {
  return {
    type: SAVE_USER_ERROR,
    error
  };
}

/**
 * Delete user send
 * @function deleteUserStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteUserStart(id) {
  return {
    type: DELETE_USER_START,
    id
  };
}

/**
 * Delete user success
 * @function deleteUserSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteUserSuccess(data) {
  return {
    type: DELETE_USER_SUCCESS,
    data
  };
}

/**
 * Delete user error
 * @function deleteUserError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteUserError(error) {
  return {
    type: DELETE_USER_ERROR,
    error
  };
}

/**
 * User status send
 * @function switchUserStatusStart
 * @returns {Object} contains the type and data
 */
export function switchUserStatusStart(id, status) {
  return {
    type: SWITCH_USER_STATUS_START,
    id,
    status
  };
}

/**
 * User status success
 * @function switchUserStatusSuccess
 * @returns {Object} contains the type and data
 */
export function switchUserStatusSuccess() {
  return {
    type: SWITCH_USER_STATUS_SUCCESS
  };
}

/**
 * User status error
 * @function switchUserStatusError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function switchUserStatusError(error) {
  return {
    type: SWITCH_USER_STATUS_ERROR,
    error
  };
}
