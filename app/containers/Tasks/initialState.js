import { fromJS } from 'immutable';

const fetchData = {
  serviceType: 'all',
  loading: false,
  error: null,
  currentPage: 1,
  data: []
};

export default fromJS({
  data: [],
  id: null,
  search: {
    results: [],
    loading: false,
    searchValue: null,
    error: null
  },
  fetchMyOwn: ['next-7-days', 'today', 'overdue'].reduce((ret, filter) => {
    ret[filter] = fetchData;
    return ret;
  }, {}),
  fetch: {
    serviceType: 'all',
    loading: false,
    error: null,
    currentPage: 1
  },
  save: {
    data: null,
    loading: false,
    error: null
  },
  single: {
    data: null,
    loading: false,
    error: null
  }
});
