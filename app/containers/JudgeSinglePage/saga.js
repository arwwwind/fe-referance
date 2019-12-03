import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../../axios';
import {
  FETCH_SINGLE_JUDGE_START,
  JUDGE_OVERVIEW_START
} from './constants';
import {
  fetchSingleJudgeError,
  fetchSingleJudgeSuccess,
  judgeOverviewSuccess,
  judgeOverviewError
} from './actions';
import config from '../../config';
import { getJudgeId } from '../../utils/router';

export function* singleJudgeFetch() {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`judges/${getJudgeId(path)}`));
    const { data } = response.data;
    yield put(fetchSingleJudgeSuccess(data));
  } catch (error) {
    try {
      yield put(fetchSingleJudgeError(error.response.data.errors));
    } catch (internal) {
      yield put(fetchSingleJudgeError(config.generalError));
    }
  }
}

export function* judgeOverviewStart({ id }) {
  try {
    const path = yield select((data) => data.get('route').get('location').get('pathname'));
    const response = yield call(() => axios.get(`/metrics/judge/${getJudgeId(path)}/overview`));
    yield put(judgeOverviewSuccess(id, response.data.data));
  } catch (error) {
    try {
      yield put(judgeOverviewError(error.response.data.errors));
    } catch (internal) {
      yield put(judgeOverviewError(config.generalError));
    }
  }
}

export default function* saga() {
  yield takeLatest(FETCH_SINGLE_JUDGE_START, singleJudgeFetch);
  yield takeLatest(JUDGE_OVERVIEW_START, judgeOverviewStart);
}
