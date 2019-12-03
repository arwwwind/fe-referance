import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import {
  FETCH_SINGLE_VENUE_START,
  SEARCH_JUDGE_START,
  FETCH_JUDGE_START,
  SINGLE_JUDGE_START,
  FETCH_JUDGE_NEW_PAGE,
  VENUE_OVERVIEW_START
} from './constants';
import {
  fetchSingleVenueStart,
  fetchJudgeData,
  fetchJudgeError,
  fetchSingleVenueError,
  fetchSingleVenueSuccess,
  fetchJudgeNewPage,
  fetchJudgeStart,
  searchJudgeStart,
  singleJudgeStart,
  resetJudgesData,
  venueOverviewSuccess,
  venueOverviewError
} from './actions';

import { showNotification } from '../App/actions';
import config from '../../config';
import { getVenueId } from '../../utils/router';

const routeByEntity = (entity, entityId) => {
  if (entity && entityId) {
    return {
      index: `judges/lists/${entity}/${entityId}`,
      search: `judges/lists/${entity}/${entityId}`
    };
  }
  return {
    index: 'judges',
    search: 'search/judges'
  };
};

export function* singleVenueFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`venues/${getVenueId(path)}`));
    const { data } = response.data;
    yield put(fetchSingleVenueSuccess(data));
  } catch (error) {
    try {
      yield put(fetchSingleVenueError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchSingleVenueError(config.generalError));
    }
  }
}

/**
 * Fetch judges
 * @function judgesFetch
 */
export function* judgesFetch({ entity, entityId }) {

  const route = routeByEntity(entity, entityId);
  const page = yield select((data) => data.get('singleVenue').get('judgesFetch').get('currentPage'));
  const searchValue = yield select((data) => data.get('singleVenue').get('judgesFetch').get('searchValue'));

  try {
    const response = yield call(() => axios.get(searchValue ? route.search : route.index, {
      params: {
        page,
        search: searchValue || undefined
      }
    }));
    yield put(fetchJudgeData(response.data.data));
  } catch (error) {
    try {
      yield put(fetchJudgeError(error.response.data.errors));
      if (error.response.data.errors.general && error.response.data.errors.general.length) {
        yield put(showNotification({
          message: error.response.data.errors.general.join(', ')
        }));
      }
    } catch (internal) {
      yield put(fetchJudgeError(config.generalError));
      yield put(showNotification());
    }
  }
}

export function* venueOverviewStart({ id }) {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`/metrics/venue/${getVenueId(path)}/overview`));
    yield put(venueOverviewSuccess(id, response.data.data));
  } catch (error) {
    try {
      yield put(venueOverviewError(error.response.data.errors));
    } catch (internal) {
      yield put(venueOverviewError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_JUDGE_START, judgesFetch);
  yield takeLatest(SEARCH_JUDGE_START, judgesFetch);
  yield takeLatest(FETCH_JUDGE_NEW_PAGE, judgesFetch);
  yield takeLatest(FETCH_SINGLE_VENUE_START, singleVenueFetch);
  yield takeLatest(VENUE_OVERVIEW_START, venueOverviewStart);
}
