import {
  DRAWER_HIDE,
  DRAWER_SHOW
} from './constants';

export function showDrawer(name) {
  return {
    type: DRAWER_SHOW,
    drawerName: name
  };
}

export function hideDrawer(name) {
  return {
    type: DRAWER_HIDE,
    drawerName: name
  };
}
