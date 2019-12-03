import { fromJS } from 'immutable';

export default fromJS({
  data: {},
  overview: {
    id: null,
    data: {},
    loading: false,
    error: null
  },
  fetch: {
    loading: false,
    error: null
  }
});
