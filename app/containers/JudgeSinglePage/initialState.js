import { fromJS } from 'immutable';

export default fromJS({
  data: {},
  fetch: {
    loading: false,
    error: null
  },
  overview: {
    id: null,
    data: {},
    loading: false,
    error: null
  },
});
