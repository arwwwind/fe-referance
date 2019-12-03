import { fromJS } from 'immutable';

export default fromJS({
  data: {},
  fetch: {
    loading: false,
    error: null
  },
  judgesFetch: {
    data: [],
    searchValue: null,
    loading: false,
    error: null,
    currentPage: 1,
    pager: {
      current: 1,
      totalItems: 0,
      totalPages: 1
    }
  },
  overview: {
    id: null,
    data: {},
    loading: false,
    error: null
  },
});
