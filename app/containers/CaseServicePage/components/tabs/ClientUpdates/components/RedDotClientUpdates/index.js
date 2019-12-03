import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { statusClientUpdatesStart } from './actions';
import { getCaseId, getServiceId } from '../../../../../../../utils/router';
import injectReducer from '../../../../../../../utils/injectReducer';
import injectSaga from '../../../../../../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

class RedDot extends React.Component {
  componentDidMount() {
    this.props.onStatusFetch(this.props.caseId, this.props.serviceId);
  }

  render() {
    if (!this.props.redDot) {
      return null;
    }

    return <i className="tab-status-point" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onStatusFetch: (caseId, serviceId) => dispatch(statusClientUpdatesStart(caseId, serviceId))
});

const mapStateToProps = (state) => {
  const statusClientUpdates = state.get('statusClientUpdates');
  return {
    redDot: statusClientUpdates.get('redDot'),
    caseId: getCaseId(state.get('route').get('location').get('pathname')),
    serviceId: getServiceId(state.get('route').get('location').get('pathname'))
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'statusClientUpdates', reducer });
const withSaga = injectSaga({ key: 'statusClientUpdates', saga });

export default compose(withReducer, withSaga, withConnect)(RedDot);
