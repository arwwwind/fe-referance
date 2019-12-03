import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  id: null,
  boardID: null,
  fetch: {
    loading: false,
    error: null
  },
  move: {
    data: [],
    loading: false,
    error: null
  },
  single: {
    data: null,
    loading: false,
    error: null
  },
  save: {
    data: null,
    loading: false,
    error: null
  },
  delete: {
    loading: false,
    error: null
  }
});
