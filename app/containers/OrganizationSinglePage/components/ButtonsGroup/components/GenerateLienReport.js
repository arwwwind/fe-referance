import React from 'react';
import { Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { showDrawer } from '../../../../../components/Core/Drawer/actions';

const GenerateLienReportButton = (props) => (
  <Button type="primary" size="large" onClick={props.openGenerateLienReport}>Generate Lien Report</Button>
);

const mapDispatchToProps = (dispatch) => ({
  openGenerateLienReport: () => dispatch(showDrawer('organizationGenerateLienReport'))
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(GenerateLienReportButton);
