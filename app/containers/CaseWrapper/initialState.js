import { fromJS } from 'immutable';

export default fromJS({
  data: {
    services: []
  },
  fetch: {
    loading: false,
    error: null
  },
  delete: {
    id: null,
    entity: null,
    visible: false,
    loading: false,
    error: null
  },
  reason: {
    reasonType: null,
    loading: false,
    error: null
  }
});
