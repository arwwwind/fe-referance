import { fromJS } from 'immutable';

export default fromJS({
  save: {
    data: null,
    loading: false,
    error: null,
    serviceId: null,
    caseId: null,
  },
  single: {
    data: null,
    loading: false,
    error: null,
    serviceId: null,
    caseId: null
  },
  step: 1
});
