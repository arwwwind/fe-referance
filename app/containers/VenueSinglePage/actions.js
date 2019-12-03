import {
  FETCH_SINGLE_VENUE_START,
  FETCH_SINGLE_VENUE_ERROR,
  FETCH_SINGLE_VENUE_SUCCESS,
  FETCH_JUDGE_NEW_PAGE,
  FETCH_JUDGE_START,
  SEARCH_JUDGE_START,
  SINGLE_JUDGE_START,
  FETCH_JUDGE_SUCCESS,
  FETCH_JUDGE_ERROR,
  RESET_JUDGE_DATA,
  VENUE_OVERVIEW_START,
  VENUE_OVERVIEW_ERROR,
  VENUE_OVERVIEW_SUCCESS
} from './constants';

/**
 * Fetch venue details start
 * @function fetchSingleVenueStart
 * @returns {Object} contains the type
 */
export function fetchSingleVenueStart() {
  return {
    type: FETCH_SINGLE_VENUE_START
  };
}

/**
 * Fetch venue details error
 * @function fetchSingleVenueError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchSingleVenueError(error) {
  return {
    type: FETCH_SINGLE_VENUE_ERROR,
    error
  };
}

/**
 * Fetch venue details data
 * @function fetchSingleVenueSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchSingleVenueSuccess(data) {
  return {
    type: FETCH_SINGLE_VENUE_SUCCESS,
    data
  };
}

export function fetchJudgeNewPage(page, entity, entityId) {
  return {
    type: FETCH_JUDGE_NEW_PAGE,
    page,
    entity,
    entityId
  };
}

/**
 * Fetch case start
 * @function fetchJudgeStart
 * @returns {Object} contains the type
 */
export function fetchJudgeStart(entity, entityId) {
  return {
    type: FETCH_JUDGE_START,
    entity,
    entityId
  };
}

/**
 * Fetch case data
 * @function searchJudgeResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchJudgeData(data) {
  return {
    type: FETCH_JUDGE_SUCCESS,
    data
  };
}

/**
 * Fetch case error
 * @function fetchJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchJudgeError(error) {
  return {
    type: FETCH_JUDGE_ERROR,
    error
  };
}

/**
 * Search case start
 * @function searchJudgeStart
 * @returns {Object} contains the type and value
 */
export function searchJudgeStart(searchValue, entity, entityId) {
  return {
    type: SEARCH_JUDGE_START,
    searchValue,
    entity,
    entityId
  };
}

/**
 * Fetch case start
 * @function singleJudgeStart
 * @returns {Object} contains the type
 */
export function singleJudgeStart(id) {
  return {
    type: SINGLE_JUDGE_START,
    id
  };
}

/**
 * Reset cases data
 * @function resetJudgesData
 * @returns {Object} contains the type
 */
export function resetJudgesData() {
  return {
    type: RESET_JUDGE_DATA
  };
}

/**
 * Venue overview start
 * @function venueOverviewStart
 * @returns {Object} contains the type
 */
export function venueOverviewStart(id) {
  return {
    type: VENUE_OVERVIEW_START,
    id
  };
}

/**
 * Venue overview error
 * @function venueOverviewError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function venueOverviewError(error) {
  return {
    type: VENUE_OVERVIEW_ERROR,
    error
  };
}

/**
 * Venue overview data
 * @function venueOverviewSuccess
 * @param id - id of venue
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function venueOverviewSuccess(id, data) {
  return {
    type: VENUE_OVERVIEW_SUCCESS,
    id,
    data
  };
}
