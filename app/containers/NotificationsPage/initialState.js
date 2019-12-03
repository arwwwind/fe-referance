import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  id: null,
  fetch: {
    loading: false,
    error: null,
    currentPage: 1
  }
});
