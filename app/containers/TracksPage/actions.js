import {
  FETCH_TRACKS_START,
  FETCH_TRACKS_RESULTS,
  FETCH_TRACKS_ERROR,
  MOVE_TRACKS_START,
  MOVE_TRACKS_RESULTS,
  MOVE_TRACKS_ERROR,
  SINGLE_TRACKS_START,
  SINGLE_TRACKS_RESULTS,
  SINGLE_TRACKS_ERROR,
  SAVE_TRACKS_START,
  SAVE_TRACKS_SUCCESS,
  SAVE_TRACKS_ERROR,
  DELETE_TRACKS_START,
  DELETE_TRACKS_SUCCESS,
  DELETE_TRACKS_ERROR
} from './constants';

/**
 * Add tracks start
 * @function singleTracksStart
 * @returns {Object} contains the type
 */
export function singleTracksStart(id, boardID) {
  return {
    type: SINGLE_TRACKS_START,
    id,
    boardID
  };
}

/**
 * Add tracks error
 * @function singleTracksError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleTracksError(error) {
  return {
    type: SINGLE_TRACKS_ERROR,
    error
  };
}

/**
 * Add tracks data
 * @function searchTracksResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleTracksData(data) {
  return {
    type: SINGLE_TRACKS_RESULTS,
    data
  };
}

/**
 * Fetch tracks start
 * @function fetchTracksStart
 * @returns {Object} contains the type
 */
export function fetchTracksStart() {
  return {
    type: FETCH_TRACKS_START
  };
}

/**
 * Fetch tracks error
 * @function fetchTracksError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchTracksError(error) {
  return {
    type: FETCH_TRACKS_ERROR,
    error
  };
}

/**
 * Fetch tracks data
 * @function searchTracksResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchTracksData(data) {
  return {
    type: FETCH_TRACKS_RESULTS,
    data
  };
}

/**
 * Move tracks start
 * @function moveTracksStart
 * @returns {Object} contains the type
 */
export function moveTracksStart(data) {
  return {
    type: MOVE_TRACKS_START,
    data
  };
}

/**
 * Move tracks result
 * @function moveTracksResult
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function moveTracksError(error) {
  return {
    type: MOVE_TRACKS_RESULTS,
    error
  };
}

/**
 * Move tracks error
 * @function moveTracksError
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function moveTracksResult() {
  return {
    type: MOVE_TRACKS_ERROR
  };
}

/**
 * Form tracks send
 * @function formTracksSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveTracksStart(data, form) {
  return {
    type: SAVE_TRACKS_START,
    data,
    form
  };
}

/**
 * Create tracks success
 * @function saveTracksSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveTracksSuccess(data) {
  return {
    type: SAVE_TRACKS_SUCCESS,
    data
  };
}

/**
 * Create tracks error
 * @function saveTracksError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveTracksError(error) {
  return {
    type: SAVE_TRACKS_ERROR,
    error
  };
}

/**
 * Delete tracks send
 * @function deleteTracksStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteTracksStart() {
  return {
    type: DELETE_TRACKS_START
  };
}

/**
 * Delete tracks success
 * @function deleteTracksSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteTracksSuccess(data) {
  return {
    type: DELETE_TRACKS_SUCCESS,
    data
  };
}

/**
 * Delete tracks error
 * @function deleteTracksError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteTracksError(error) {
  return {
    type: DELETE_TRACKS_ERROR,
    error
  };
}

