import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CoreDrawer from '../../../../components/Core/Drawer';
import Form from './Form';
import { generateLienReportStart } from '../../actions';

const Drawer = (props) => (
  <CoreDrawer title="Generate Lien Report" name="organizationGenerateLienReport" width={407}>
    <Form onSend={props.onSend} />
  </CoreDrawer>
);

const mapDispatchToProps = (dispatch, props) => ({
  onSend: (data, form) => dispatch(generateLienReportStart(props.organizationId, data, form))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Drawer);
