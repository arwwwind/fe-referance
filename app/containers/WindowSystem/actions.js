import {
  WINDOW_HIDE,
  WINDOW_SHOW,
  WINDOW_CLOSE
} from './constants';

export function showWindow(key, options) {
  return {
    type: WINDOW_SHOW,
    key,
    options
  };
}

export function hideWindow(key) {
  return {
    type: WINDOW_HIDE,
    key
  };
}

export function closeWindow(key) {
  return {
    type: WINDOW_CLOSE,
    key
  };
}
