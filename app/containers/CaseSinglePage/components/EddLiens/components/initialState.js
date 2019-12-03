import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  chartData: [],
  id: null,
  fetch: {
    loading: false,
    error: null
  },
  edit: {
    data: [],
    loading: false,
    error: null
  }
});
