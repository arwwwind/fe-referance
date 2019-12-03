import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../components/Core/Drawer';
import Form from './Form';
import { getServiceId } from '../../../../utils/router';
import { serviceReasonStart } from '../../actions';

const sendForm = (props, data, form) => {
  props.onSend(props.serviceId, data, form, props.reasonType);
};

const DrawerServiceReason = (props) => (
  <CoreDrawer title={`Add ${props.reasonType} reason`} name="serviceReasonDrawer" width={407} className="service-reason-drawer">
    <Form onSend={(data, form) => sendForm(props, data, form)} />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch) => ({
  onSend: (id, data, form, reasonType) => dispatch(serviceReasonStart(id, data, form, reasonType))
});

const mapStateToProps = (state) => ({
  reasonType: state.get('caseDetails').get('reason').get('reasonType'),
  serviceId: parseInt(getServiceId(state.get('route').get('location').get('pathname')), 10),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DrawerServiceReason);
