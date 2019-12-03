import { call, takeEvery } from 'redux-saga/effects';
import { WINDOW_SHOW } from './constants';

export function* show() {
  //yield call(() => document.body.classList.add('juvo-minimize-modal-open'));
}

export function* saga() {
  yield takeEvery(WINDOW_SHOW, show);
}
